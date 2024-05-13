import { PutObjectCommand } from '@aws-sdk/client-s3';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { dynamoClient } from '@libs/dynamoClient';
import { s3Client } from '@libs/s3Client';
import { bodyParser } from '@utils/bodyParser';
import { response } from '@utils/response';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { randomUUID } from 'crypto';

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  const { fileName } = bodyParser(event.body);

  if (!fileName) {
    return response(400, { error: 'File name is required.' });
  }

  const fileKey = `${randomUUID()}-${fileName}`;

  const s3Command = new PutObjectCommand({
    Bucket: process.env.BUCKET_UPLOAD_NAME,
    Key: fileKey,
  });

  const signedURL = await getSignedUrl(s3Client, s3Command, { expiresIn: 60 });

  const command = new PutCommand({
    TableName: 'UploadedFiles',
    Item: {
      fileKey,
      originalFileName: fileName,
      status: 'PENDING',
      expiresAt: Date.now() + 60000,
    },
  });

  await dynamoClient.send(command);

  return response(200, { signedURL });
}
