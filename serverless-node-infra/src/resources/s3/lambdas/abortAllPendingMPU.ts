import { AbortMultipartUploadCommand, ListMultipartUploadsCommand } from '@aws-sdk/client-s3';

import { s3Client } from '@libs/s3Client';
import { response } from '@utils/response';

const { FILE_UPLOAD_BUCKET } = process.env;

export async function handler() {
  const listCommand = new ListMultipartUploadsCommand({
    Bucket: FILE_UPLOAD_BUCKET,
  });
  const { Uploads } = await s3Client.send(listCommand);
  if (Uploads) {
    await Promise.all(
      Uploads.map(({ Key, UploadId }) => {
        const abortCommand = new AbortMultipartUploadCommand({
          Bucket: FILE_UPLOAD_BUCKET,
          Key,
          UploadId,
        });

        return s3Client.send(abortCommand);
      }),
    );
  }

  return response(204);
}
