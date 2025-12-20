import axios from 'axios';

import { sleep } from '../libs/utils';

import { httpClient } from './httpClient';

export interface IFile {
  fileKey: string;
  originalFileName: string;
  status: string;
  expiresAt: Date;
  signedURL?: string;
}

type signedURLType = 'GET' | 'PUT';

type InitiateMPUParams = {
  filename: string;
  totalChunks: number;
};

type InitiateMPUResponse = {
  key: string;
  uploadId: string;
  parts: {
    url: string;
    partNumber: number;
  }[];
};

type UploadChunkParams = {
  url: string;
  chunk: Blob;
  maxRetries?: number;
  partNumber: number;
  progressFn: () => void;
};

type AbortMPUParams = {
  fileKey: string;
  uploadId: string;
};

type CompleteMPUParams = {
  fileKey: string;
  uploadId: string;
  parts: {
    partNumber: number;
    entityTag: string;
  }[];
};

type GetPresignedPostResponse = {
  url: string;
  fields: Record<string, string>;
};

export class UploadFileService {
  static async getPresignedUrl(filename: string, type: signedURLType) {
    const { data } = await httpClient.post<{ signedURL: string }>('/s3/getPresignedURL', {
      filename,
      type,
    });
    return data.signedURL;
  }

  static async uploadFile(url: string, file: File, onProgress?: (progress: number) => void) {
    await axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
      onUploadProgress: ({ total, loaded }) => {
        const percentage = Math.round((loaded * 100) / (total ?? 0));
        onProgress?.(percentage);
      },
    });
  }

  static async getFiles() {
    const { data } = await httpClient.get<{ data: IFile[] }>('/s3/listFiles');
    return data.data;
  }

  static async deleteFile(fileKey: string) {
    return httpClient.get('/s3/deleteFile', {
      params: {
        fileKey,
      },
    });
  }

  static async initiateMPU({ filename, totalChunks }: InitiateMPUParams) {
    const { data } = await httpClient.post<InitiateMPUResponse>('/s3/getPresignedURL', {
      filename,
      totalChunks,
      type: 'MPU',
    });

    return data;
  }

  static async uploadChunk({
    chunk,
    url,
    maxRetries = 1,
    partNumber,
    progressFn,
  }: UploadChunkParams): Promise<{ entityTag: string; partNumber: number }> {
    try {
      const { headers } = await httpClient.put<null, { headers: { etag: string } }>(url, chunk);

      const entityTag = headers.etag.replace(/"/g, '');

      progressFn();

      // const entityTag = 'oi';
      return { entityTag, partNumber };
    } catch (error) {
      if (maxRetries > 0) {
        await sleep(2000);
        return this.uploadChunk({ chunk, url, maxRetries: maxRetries - 1, partNumber, progressFn });
      }
      throw error;
    }
  }

  static async completeMPU({ fileKey, parts, uploadId }: CompleteMPUParams) {
    await httpClient.post('/s3/completeMPU', {
      fileKey,
      parts,
      uploadId,
    });
  }

  static async abortMPU({ fileKey, uploadId }: AbortMPUParams) {
    await httpClient.delete('/s3/abortMPU', {
      data: {
        fileKey,
        uploadId,
      },
    });
  }

  static async uploadBatchFiles(files: File[]) {
    const { data } = await httpClient.post<GetPresignedPostResponse>('/s3/getPresignedBatchPOST', {
      files: files.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
      })),
    });

    const { url, fields } = data;
    delete fields.key;

    await Promise.allSettled(
      files.map(async (file) => {
        const formData = new FormData();
        const fileKey = `user1/${window.crypto.randomUUID()}-${file.name}`;

        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value);
        });

        formData.append('key', fileKey);
        formData.append('Content-Type', file.type);
        formData.append('file', file);

        await axios.post(url, formData);
      }),
    );
  }
}
