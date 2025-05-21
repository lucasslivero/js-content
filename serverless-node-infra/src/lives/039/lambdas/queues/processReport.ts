import { randomUUID } from 'crypto';

import { env } from '@config/env';
import { mbToBytes } from '@utils/mbToBytes';

import { getLeadsGenerator } from '../../db/getLeadsGenerator';
import { getPresignedURL } from '../../services/getPresignedURL';
import { S3MPUManager } from '../../services/S3MPUManager';
import { sendEmail } from '../../services/sendEmail';

const minChunkSize = mbToBytes(6);

export async function handler() {
  const fileKey = `${new Date().getTime()}-${randomUUID()}.csv`;

  const mpu = new S3MPUManager(env.REPORTS_BUCKET_NAME, fileKey);
  await mpu.start();

  try {
    const header = 'ID,Nome,E-mail,Cargo\n';
    let currentChunk = header;

    for await (const { Items: leads = [] } of getLeadsGenerator()) {
      currentChunk += leads
        .map((lead) => `${lead.id.S},${lead.name.S},${lead.email.S},${lead.jobTitle.S}\n`)
        .join('');

      const currentChunkSize = Buffer.byteLength(currentChunk, 'utf-8');

      if (currentChunkSize < minChunkSize) {
        continue;
      }

      await mpu.uploadPart(Buffer.from(currentChunk, 'utf-8'));

      currentChunk = '';
    }

    if (currentChunk) {
      await mpu.uploadPart(Buffer.from(currentChunk, 'utf-8'));
    }

    await mpu.complete();
  } catch (error) {
    await mpu.abort();
    return;
  }

  const presignedUrl = await getPresignedURL({
    bucket: env.REPORTS_BUCKET_NAME,
    fileKey,
  });

  await sendEmail({
    from: 'JStack <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'O seu relatório já está pronto!',
    text: `Aqui está o seu relatório (a URL é válido por apenas 24h): ${presignedUrl}`,
    html: `
      <h1 style="font-size:32px;font-weight:bold;">Seu relatório ficou pronto!</h1>
      <br />
      Clique <a href="${presignedUrl}" target="_blank">aqui</a> para baixar ou acesse a URL: ${presignedUrl}.
      <br /><br />
      <small>Este link é válido por apenas 24 horas.</small>
    `,
  });
}
