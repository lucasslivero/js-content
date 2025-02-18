import { randomUUID } from 'crypto';

import { SendMessageCommand } from '@aws-sdk/client-sqs';
import type { LambdaFunctionURLEvent } from 'aws-lambda';

import { sqsClient } from '@libs/sqsClient';
import { bodyParser } from '@utils/bodyParser';
import { response } from '@utils/response';

const { ORDER_QUEUE_URL } = process.env;

export async function handler(event: LambdaFunctionURLEvent) {
  const { message } = bodyParser(event.body);
  const item = {
    orderId: randomUUID(),
    message,
  };
  const command = new SendMessageCommand({
    MessageBody: JSON.stringify(item),
    QueueUrl: ORDER_QUEUE_URL,
  });
  await sqsClient.send(command);
  return response(200, item);
}
