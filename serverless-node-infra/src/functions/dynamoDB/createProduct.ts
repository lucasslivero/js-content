import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@libs/dynamoClient';
import { bodyParser } from '@utils/bodyParser';
import { response } from '@utils/response';

import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { randomUUID } from 'node:crypto';

export async function handler(event: APIGatewayProxyEventV2) {
  const body = bodyParser(event.body);

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

  const bodyResp = await dynamoClient.send(command);

  return response(201, bodyResp);
}
