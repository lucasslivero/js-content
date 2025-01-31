import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

import { dynamoClient } from '@libs/dynamoClient';
import { bodyParser } from '@utils/bodyParser';
import { response } from '@utils/response';

export async function handler(event: APIGatewayProxyEventV2) {
  const body = bodyParser(event.body);

  const productId = event.pathParameters?.productId;

  const command = new UpdateCommand({
    TableName: 'ProductsTable',
    Key: {
      id: productId,
    },
    UpdateExpression: 'set #n = :n, #p = :p, #t = :t',
    ExpressionAttributeNames: {
      '#n': 'name',
      '#p': 'price',
      '#t': 'tags',
    },
    ExpressionAttributeValues: {
      ':n': body.name,
      ':p': body.price,
      ':t': body.tags,
    },
  });

  await dynamoClient.send(command);

  return response(204);
}
