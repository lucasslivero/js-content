import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { fromIni } from '@aws-sdk/credential-providers';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const isLocal = process.env?.STAGE === 'dev';
const client = new DynamoDBClient({
  ...(isLocal && {
    endpoint: 'http://localhost:8000',
    credentials: fromIni({ profile: 'app' }),
  }),
});

export const dynamoClient = DynamoDBDocumentClient.from(client);
