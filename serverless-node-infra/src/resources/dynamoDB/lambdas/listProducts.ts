import { ScanCommand } from '@aws-sdk/lib-dynamodb';

import { dynamoDocClient } from '@libs/dynamoClient';
import { response } from '@utils/response';

const { PRODUCTS_TABLE } = process.env;

export async function handler() {
  const command = new ScanCommand({
    TableName: PRODUCTS_TABLE,
  });

  const { Items } = await dynamoDocClient.send(command);

  return response(200, Items);
}
