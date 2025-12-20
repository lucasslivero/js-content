import { CloudUploadIcon } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { bytesToMb, cn } from '@/app/libs/utils';
import { UploadFileService } from '@/app/services/uploadFileService';
import { Button } from '@/components/ui/Button';

export function FileUploaderPostPage() {
  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
  });

  async function handleUpload() {
    if (!files.length) {
      return;
    }

    await UploadFileService.uploadBatchFiles(files);
  }

  return (
    <div className="grid h-screen place-items-center">
      <div className="w-full max-w-sm">
        <div
          {...getRootProps()}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-10 transition-colors',
            isDragActive && 'bg-accent',
          )}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon className="size-10" />
          <span className="text-muted-foreground">Solte o arquivo aqui</span>
        </div>

        {files.length > 0 && (
          <div className="mt-10 border-t pt-8">
            <div className="space-y-2">
              {files.map((file) => (
                <div key={file.name}>
                  <span>{file.name}</span>
                  <small className="block text-muted-foreground">{bytesToMb(file.size)}MB</small>
                </div>
              ))}
            </div>

            <Button className="mt-4 w-full" onClick={handleUpload}>
              Upload
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
