import { AbortMultipartUploadCommand } from '@aws-sdk/client-s3';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

import { dynamoDocClient } from '@libs/dynamoClient';
import { s3Client } from '@libs/s3Client';
import { bodyParser } from '@utils/bodyParser';
import { response } from '@utils/response';

const { FILE_UPLOAD_BUCKET, UPLOAD_FILE_TABLE } = process.env;

export async function handler(event: APIGatewayProxyEventV2) {
  const { fileKey, uploadId } = bodyParser(event.body);
  const command = new AbortMultipartUploadCommand({
    Bucket: FILE_UPLOAD_BUCKET,
    Key: fileKey,
    UploadId: uploadId,
  });

  await s3Client.send(command);

  const commandDB = new DeleteCommand({
    TableName: UPLOAD_FILE_TABLE,
    Key: {
      fileKey,
    },
  });

  await dynamoDocClient.send(commandDB);

  return response(204);
}
