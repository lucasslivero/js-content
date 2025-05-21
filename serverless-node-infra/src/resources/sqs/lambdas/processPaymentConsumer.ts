import { PutCommand } from '@aws-sdk/lib-dynamodb';
import type { SQSBatchItemFailure, SQSBatchResponse, SQSEvent } from 'aws-lambda';

import { dynamoDocClient } from '@libs/dynamoClient';
import { bodyParser } from '@utils/bodyParser';

const { PAYMENTS_TABLE } = process.env;

export async function handler(event: SQSEvent): Promise<SQSBatchResponse> {
  const commands = event.Records.map((sqsRecord) => {
    const bodyItem = bodyParser(sqsRecord.body);
    const command = new PutCommand({
      TableName: PAYMENTS_TABLE,
      Item: {
        id: bodyItem.orderId,
        message: bodyItem.message,
      },
    });
    return dynamoDocClient.send(command);
  });
  const responses = await Promise.allSettled(commands);
  const batchItemFailures: SQSBatchItemFailure[] = [];
  responses.forEach((response, index) => {
    if (response.status === 'rejected') {
      batchItemFailures.push({
        itemIdentifier: event.Records[index].messageId,
      });
      // eslint-disable-next-line no-console
      console.error(response.reason);
    }
  });
  return {
    batchItemFailures,
  };
}
