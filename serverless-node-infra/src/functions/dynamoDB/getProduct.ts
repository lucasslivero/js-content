import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@libs/dynamoClient';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2) {
  if (!event?.pathParameters?.productId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Product id is missing' }),
    };
  }
  const { productId } = event.pathParameters;

  const command = new GetCommand({
    TableName: 'ProductsTable',
    Key: {
      id: productId,
    },
  });

  const { Item } = await dynamoClient.send(command);

  if (!Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: 'Product not found.',
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      product: Item,
    }),
  };
}
