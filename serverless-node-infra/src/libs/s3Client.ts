import { S3Client } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';

const isLocal = process.env?.STAGE === 'dev';
export const s3Client = new S3Client({
  ...(isLocal && {
    credentials: fromIni({ profile: 'app' }),
  }),
});
