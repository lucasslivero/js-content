import axios from 'axios';

import { httpClient } from './httpClient';

export class UploadFileService {
  static async getPresignedUrl(file: File) {
    const { data } = await httpClient.post<{ signedUrl: string }>('/clients', {
      filename: file.name,
    });

    return data.signedUrl;
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
}
