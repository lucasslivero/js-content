import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@libs/dynamoClient';
import { response } from '@utils/response';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2) {
  const productId = event.pathParameters?.productId;

  const command = new DeleteCommand({
    TableName: 'ProductsTable',
    Key: {
      id: productId,
    },
  });

  await dynamoClient.send(command);

  return response(204);
}
