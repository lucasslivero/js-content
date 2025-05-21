import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import type { S3Event } from 'aws-lambda';

import { dynamoDocClient } from '@libs/dynamoClient';

const { UPLOAD_FILE_TABLE } = process.env;

export async function handler(event: S3Event) {
  const commands = event.Records.map((record) => {
    return new UpdateCommand({
      TableName: UPLOAD_FILE_TABLE,
      Key: {
        fileKey: decodeURIComponent(record.s3.object.key),
      },
      UpdateExpression: 'SET #status = :status REMOVE #expiresAt',
      ExpressionAttributeNames: {
        '#status': 'status',
        '#expiresAt': 'expiresAt',
      },
      ExpressionAttributeValues: {
        ':status': 'UPLOADED',
      },
    });
  });

  await Promise.all(commands.map((command) => dynamoDocClient.send(command)));
}
