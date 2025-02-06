import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

import { dynamoClient } from '@libs/dynamoClient';
import { s3Client } from '@libs/s3Client';
import { response } from '@utils/response';

const { UPLOAD_FILE_TABLE, FILE_UPLOAD_BUCKET } = process.env;

export async function handler(event: APIGatewayProxyEventV2) {
  const fileKey = event.queryStringParameters?.fileKey;

  try {
    const s3Command = new DeleteObjectCommand({
      Bucket: FILE_UPLOAD_BUCKET,
      Key: fileKey,
    });

    await s3Client.send(s3Command);

    const command = new DeleteCommand({
      TableName: UPLOAD_FILE_TABLE,
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
