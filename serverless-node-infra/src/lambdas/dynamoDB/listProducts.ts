import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@libs/dynamoClient';
import { response } from '@utils/response';

export async function handler() {
  const command = new ScanCommand({
    TableName: 'ProductsTable',
  });

  const { Items } = await dynamoClient.send(command);

  return response(200, Items);
}
