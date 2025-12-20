import { randomUUID } from 'crypto';

import {
  CreateMultipartUploadCommand,
  GetObjectCommand,
  PutObjectCommand,
  UploadPartCommand,
} from '@aws-sdk/client-s3';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

import { dynamoDocClient } from '@libs/dynamoClient';
import { s3Client } from '@libs/s3Client';
import { bodyParser } from '@utils/bodyParser';
import { response } from '@utils/response';

const { UPLOAD_FILE_TABLE, FILE_UPLOAD_BUCKET } = process.env;

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  const { filename, type, totalChunks, size } = bodyParser(event.body);

  if (!filename || !type) {
    return response(400, { error: 'File name is required.' });
  }

  try {
    if (type === 'PUT') {
      const fileKey = `${randomUUID()}-${filename}`;

      const s3Command = new PutObjectCommand({
        Bucket: FILE_UPLOAD_BUCKET,
        Key: fileKey,
      });

      const signedURL = await getSignedUrl(s3Client, s3Command, { expiresIn: 60 });

      const command = new PutCommand({
        TableName: UPLOAD_FILE_TABLE,
        Item: {
          fileKey,
          originalFileName: filename,
          status: 'PENDING',
          expiresAt: Date.now() + 60000,
        },
      });

      await dynamoDocClient.send(command);

      return response(200, { signedURL });
    }
    if (type === 'GET') {
      const s3Command = new GetObjectCommand({
        Bucket: FILE_UPLOAD_BUCKET,
        Key: filename,
      });

      const signedURL = await getSignedUrl(s3Client, s3Command, { expiresIn: 60 });
      return response(200, { signedURL });
    }
    if (type === 'MPU') {
      const key = `${randomUUID()}-${filename}`;

      const createMPUCommand = new CreateMultipartUploadCommand({
        Bucket: FILE_UPLOAD_BUCKET,
        Key: key,
      });

      const { UploadId } = await s3Client.send(createMPUCommand);

      if (!UploadId) {
        return response(500, { error: 'Failed creating multipart upload.' });
      }

      const signedURLPromises = [];

      for (let partNumber = 1; partNumber <= totalChunks; partNumber += 1) {
        const uploadPartCommand = new UploadPartCommand({
          Bucket: FILE_UPLOAD_BUCKET,
          Key: key,
          UploadId,
          PartNumber: partNumber,
        });

        signedURLPromises.push(getSignedUrl(s3Client, uploadPartCommand, { expiresIn: 3600 }));
      }

      const command = new PutCommand({
        TableName: UPLOAD_FILE_TABLE,
        Item: {
          fileKey: key,
          originalFileName: filename,
          status: 'PENDING',
          expiresAt: Date.now() + 60000,
        },
      });

      await dynamoDocClient.send(command);

      const urls = await Promise.all(signedURLPromises);
      return response(200, {
        key,
        uploadId: UploadId,
        parts: urls.map((url, index) => ({
          url,
          partNumber: index + 1,
        })),
      });
    }
    if (type === 'POST') {
      const MB_IN_BYTES = 1024 * 1024;
      if (size > MB_IN_BYTES) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: 'The file should have up to 1MB.',
          }),
        };
      }

      const fileKey = `${randomUUID()}-${filename}`;

      const { url, fields } = await createPresignedPost(s3Client, {
        Bucket: FILE_UPLOAD_BUCKET!,
        Key: fileKey,
        Expires: 600,
        Conditions: [['content-length-range', size, size], { 'Content-Type': type }],
        Fields: {
          'Content-Type': type,
        },
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          url,
          fields,
        }),
      };
    }
  } catch (error: any) {
    return response(400, error);
  }
  return response(400, { message: 'Unsupported type sended.' });
}
