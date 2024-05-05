import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@libs/dynamoClient';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2) {
  if (!event.body) {
    return {
      statusCode: 422,
      body: JSON.stringify({ message: 'no body' }),
    };
  }
  const body = JSON.parse(event.body);

  if (!event?.pathParameters?.productId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Product id is missing' }),
    };
  }

  const { productId } = event.pathParameters;

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

  return {
    statusCode: 204,
  };
}
