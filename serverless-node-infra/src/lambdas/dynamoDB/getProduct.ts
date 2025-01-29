import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@libs/dynamoClient';
import { response } from '@utils/response';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2) {
  const productId = event.pathParameters?.productId;

  const command = new GetCommand({
    TableName: 'ProductsTable',
    Key: {
      id: productId,
    },
  });

  const { Item } = await dynamoClient.send(command);

  if (!Item) {
    return response(404, { error: 'Product not found .' });
  }

  return response(200, { product: Item });
}
