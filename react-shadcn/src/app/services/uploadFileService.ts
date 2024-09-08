import axios from 'axios';

import { httpClient } from './httpClient';

export interface IFile {
  fileKey: string;
  originalFileName: string;
  status: string;
  expiresAt: Date;
  signedURL?: string;
}

type signedURLType = 'GET' | 'PUT';

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
    const { data } = await httpClient.get<IFile[]>('/s3/listFiles');
    return data;
  }

  static async deleteFile(fileKey: string) {
    return httpClient.get('/s3/deleteFile', {
      params: {
        fileKey,
      },
    });
  }
}
