import { ListMultipartUploadsCommand } from '@aws-sdk/client-s3';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

import { dynamoDocClient } from '@libs/dynamoClient';
import { s3Client } from '@libs/s3Client';
import { response } from '@utils/response';

const { UPLOAD_FILE_TABLE, FILE_UPLOAD_BUCKET } = process.env;

export async function handler() {
  try {
    const command = new ScanCommand({
      TableName: UPLOAD_FILE_TABLE,
    });

    const { Items } = await dynamoDocClient.send(command);

    const commandS3 = new ListMultipartUploadsCommand({
      Bucket: FILE_UPLOAD_BUCKET,
    });

    const { Uploads } = await s3Client.send(commandS3);

    return response(200, { data: Items, pending: Uploads ?? [] });
  } catch (error: any) {
    return response(400, error);
  }
}
