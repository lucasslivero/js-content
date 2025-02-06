import { ScanCommand } from '@aws-sdk/lib-dynamodb';

import { dynamoClient } from '@libs/dynamoClient';
import { response } from '@utils/response';

const { UPLOAD_FILE_TABLE } = process.env;

export async function handler() {
  try {
    const command = new ScanCommand({
      TableName: UPLOAD_FILE_TABLE,
    });

    const { Items } = await dynamoClient.send(command);
    return response(200, Items);
  } catch (error: any) {
    return response(400, error);
  }
}
