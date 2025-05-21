import { paginateScan } from '@aws-sdk/client-dynamodb';

import { env } from '@config/env';
import { dynamoClient } from '@libs/dynamoClient';

export function getLeadsGenerator() {
  const paginator = paginateScan({ client: dynamoClient }, { TableName: env.DYNAMO_LEADS_TABLE });

  return paginator;
}
