import { CompleteMultipartUploadCommand } from '@aws-sdk/client-s3';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

import { s3Client } from '@libs/s3Client';
import { bodyParser } from '@utils/bodyParser';
import { response } from '@utils/response';

const { FILE_UPLOAD_BUCKET } = process.env;

export async function handler(event: APIGatewayProxyEventV2) {
  const { fileKey, uploadId, parts } = bodyParser(event.body);
  const command = new CompleteMultipartUploadCommand({
    Bucket: FILE_UPLOAD_BUCKET,
    Key: fileKey,
    UploadId: uploadId,
    MultipartUpload: {
      Parts: parts.map((part: { partNumber: number; entityTag: string }) => ({
        PartNumber: part.partNumber,
        ETag: part.entityTag,
      })),
    },
  });

  await s3Client.send(command);

  return response(204);
}
