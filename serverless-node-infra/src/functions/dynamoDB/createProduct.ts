import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@libs/dynamoClient';

import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { randomUUID } from 'node:crypto';

export async function handler(event: APIGatewayProxyEventV2) {
  if (!event.body) {
    return {
      statusCode: 422,
      body: JSON.stringify({ message: 'no body' }),
    };
  }
  const body = JSON.parse(event.body);

  const id = randomUUID();

  const command = new PutCommand({
    TableName: 'ProductsTable',
    Item: {
      id,
      name: body.name,
      price: body.price,
      tags: body.tags,
    },
  });

  const response = await dynamoClient.send(command);

  return {
    statusCode: 201,
    body: JSON.stringify(response),
  };
}
