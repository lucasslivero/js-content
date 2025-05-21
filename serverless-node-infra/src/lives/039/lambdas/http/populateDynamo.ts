import { randomUUID } from 'node:crypto';

import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { faker } from '@faker-js/faker';

import { env } from '@config/env';
import { dynamoDocClient } from '@libs/dynamoClient';
import { response } from '@utils/response';

export async function handler() {
  const total = 500;

  const responses = await Promise.allSettled(
    Array.from({ length: total }, async () => {
      const command = new PutItemCommand({
        TableName: env.DYNAMO_LEADS_TABLE,
        Item: {
          id: { S: randomUUID() },
          name: { S: faker.person.fullName() },
          email: { S: faker.internet.email().toLowerCase() },
          jobTitle: { S: faker.person.jobTitle() },
        },
      });

      await dynamoDocClient.send(command);
    }),
  );

  const totalCreatedLeads = responses.filter((result) => result.status === 'fulfilled').length;

  return response(201, { totalCreatedLeads });
}
