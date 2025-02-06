import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

import { dynamoClient } from '@libs/dynamoClient';
import { response } from '@utils/response';

const { PRODUCTS_TABLE } = process.env;

export async function handler(event: APIGatewayProxyEventV2) {
  const productId = event.pathParameters?.productId;

  const command = new DeleteCommand({
    TableName: PRODUCTS_TABLE,
    Key: {
      id: productId,
    },
  });

  await dynamoClient.send(command);

  return response(204);
}
