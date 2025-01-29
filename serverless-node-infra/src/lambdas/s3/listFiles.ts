import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@libs/dynamoClient';
import { response } from '@utils/response';

export async function handler() {
  try {
    const command = new ScanCommand({
      TableName: 'UploadedFiles',
    });

    const { Items } = await dynamoClient.send(command);
    return response(200, Items);
  } catch (error: any) {
    return response(400, error);
  }
}
