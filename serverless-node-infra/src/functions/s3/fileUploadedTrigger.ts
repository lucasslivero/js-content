import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient } from '@libs/dynamoClient';
import { S3Event } from 'aws-lambda';

export async function handler(event: S3Event) {
  const commands = event.Records.map((record) => {
    return new UpdateCommand({
      TableName: 'UploadedFiles',
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

  await Promise.all(commands.map((command) => dynamoClient.send(command)));
}
