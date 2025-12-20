import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

import { s3Client } from '@libs/s3Client';
import { bodyParser } from '@utils/bodyParser';

const { FILE_UPLOAD_BUCKET } = process.env;

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  const { files } = bodyParser<{ files: File[] }>(event.body);

  const invalidFileIndex = files.findIndex((file) => {
    return !file.name || !file.type || !file.size;
  });

  if (invalidFileIndex >= 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: `fileName, fileType and fileSize are required for files[${invalidFileIndex}].`,
      }),
    };
  }

  const MB_IN_BYTES = 1024 * 1024;
  const invalidFileSizeIndex = files.findIndex((file) => {
    return file.size > MB_IN_BYTES;
  });

  if (invalidFileSizeIndex >= 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: `The files[${invalidFileSizeIndex}] should have up to 1MB.`,
      }),
    };
  }

  const tagging =
    '<Tagging><TagSet><Tag><Key>apply-lifecycle</Key><Value>true</Value></Tag></TagSet></Tagging>';

  const { url, fields } = await createPresignedPost(s3Client, {
    Bucket: FILE_UPLOAD_BUCKET!,
    // eslint-disable-next-line no-template-curly-in-string
    Key: 'user1/${filename}',
    Expires: 600,
    Conditions: [
      ['content-length-range', 0, MB_IN_BYTES],
      ['starts-with', '$Content-Type', 'image/'],
      { tagging },
      // ['starts-with', '$key', 'user1/']
    ],
    Fields: {
      tagging,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      url,
      fields,
    }),
  };
}
