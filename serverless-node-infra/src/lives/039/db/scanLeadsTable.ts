import { AttributeValue, ScanCommand } from '@aws-sdk/client-dynamodb';

import { env } from '@config/env';
import { dynamoDocClient } from '@libs/dynamoClient';

export async function* scanLeadsTable() {
  let lastEvaluatedKey: Record<string, AttributeValue> | undefined;

  do {
    const command = new ScanCommand({
      TableName: env.DYNAMO_LEADS_TABLE,
      ExclusiveStartKey: lastEvaluatedKey,
    });

    // eslint-disable-next-line no-await-in-loop
    const { Items = [], LastEvaluatedKey } = await dynamoDocClient.send(command);

    lastEvaluatedKey = LastEvaluatedKey;
    yield Items;
  } while (lastEvaluatedKey);
}
