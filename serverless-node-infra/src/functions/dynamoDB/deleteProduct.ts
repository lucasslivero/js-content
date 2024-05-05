import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@libs/dynamoClient';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2) {
  if (!event?.pathParameters?.productId) {
    return {
      statusCode: 422,
      body: JSON.stringify({ message: 'Product id is missing' }),
    };
  }
  const { productId } = event.pathParameters;

  const command = new DeleteCommand({
    TableName: 'ProductsTable',
    Key: {
      id: productId,
    },
  });

  await dynamoClient.send(command);

  return {
    statusCode: 204,
  };
}
