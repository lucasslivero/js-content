import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

import { dynamoClient } from '@libs/dynamoClient';
import { s3Client } from '@libs/s3Client';
import { response } from '@utils/response';

export async function handler(event: APIGatewayProxyEventV2) {
  const fileKey = event.queryStringParameters?.fileKey;

  try {
    const s3Command = new DeleteObjectCommand({
      Bucket: process.env.BUCKET_UPLOAD_NAME,
      Key: fileKey,
    });

    await s3Client.send(s3Command);

    const command = new DeleteCommand({
      TableName: 'UploadedFiles',
      Key: {
        fileKey,
      },
    });

    await dynamoClient.send(command);
    return response(204);
  } catch (error: any) {
    return response(400, error);
  }
}
