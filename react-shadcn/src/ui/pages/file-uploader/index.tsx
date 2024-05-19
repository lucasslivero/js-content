import { useMutation, useQuery } from '@tanstack/react-query';
import { Loader2Icon, PackageOpenIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

import { cn } from '@/app/libs/utils';
import { IFile, UploadFileService } from '@/app/services/UploadFileService';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/Progress';
import { Spinner } from '@/components/ui/Spinner';

interface IUpload {
  file: File;
  progress: number;
}

export function FileUploader() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<IFile | null>(null);
  const [uploads, setUploads] = useState<IUpload[]>([]);

  const {
    data: filesUploaded,
    isFetching: loadingFiles,
    refetch: refetchFiles,
  } = useQuery({
    queryKey: ['s3-listFiles'],
    queryFn: () => UploadFileService.getFiles(),
  });

  const { mutateAsync, isPending: loadingImage } = useMutation({
    mutationFn: (data: IFile) => {
      return UploadFileService.getPresignedUrl(data.fileKey, 'GET');
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptFiles) => {
      setUploads((prevState) =>
        prevState.concat(acceptFiles.map((file) => ({ file, progress: 0 }))),
      );
    },
  });

  function handleRemoveFile(fileIndex: number) {
    setUploads((prevState) => {
      const newState = [...prevState];
      newState.splice(fileIndex, 1);
      return newState;
    });
  }

  function updateProgress(progress: number, index: number) {
    setUploads((prevState) => {
      const newState = [...prevState];
      const uploadFile = newState[index];
      newState[index] = {
        ...uploadFile,
        progress,
      };
      return newState;
    });
  }

  async function handleUpload() {
    setIsLoading(true);
    try {
      const uploadFiles = await Promise.all(
        uploads.map(async ({ file }) => ({
          file,
          url: await UploadFileService.getPresignedUrl(file.name, 'PUT'),
        })),
      );

      const responses = await Promise.allSettled(
        uploadFiles.map(({ file, url }, index) =>
          UploadFileService.uploadFile(url, file, (progress) => updateProgress(progress, index)),
        ),
      );

      responses.forEach((response, index) => {
        if (response.status === 'rejected') {
          const fileWithError = uploads[index].file;
          console.log(`O Upload do arquivo ${fileWithError.name} falhou`);
        }
      });

      setUploads([]);
      toast.success('Uploads realizados com sucesso !');
      refetchFiles();
    } catch {
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSelectFile(file: IFile) {
    setSelectedFile(file);
    const signedURL = await mutateAsync(file);
    setSelectedFile({ ...file, signedURL });
  }

  return (
    <div className="flex h-full w-full justify-center gap-4 px-6 py-20">
      <div className="h-full w-1/2 max-w-xl overflow-auto">
        <h1 className="mb-2 text-xl">Upload yours files</h1>
        <div
          {...getRootProps()}
          className={cn(
            'flex h-60 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed transition-colors',
            isDragActive && 'bg-accent/50',
          )}
        >
          <input {...getInputProps()} />

          <PackageOpenIcon className="mb-2 size-10 stroke-1" />
          <span>Solte os seus arquivos aqui</span>
          <small className="text-muted-foreground">Apenas arquivos de imagem até 1MB</small>
        </div>
        {uploads.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-medium tracking-tight">Arquivos Selecionados</h2>
            <div className="mb-4 space-y-2">
              {uploads.map(({ file, progress }, index) => (
                <div key={file.name} className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{file.name}</span>

                    <Button variant="destructive" size="icon">
                      <Trash2Icon className="size-4" onClick={() => handleRemoveFile(index)} />
                    </Button>
                  </div>
                  <Progress className="mt-3 h-2" value={progress} />
                </div>
              ))}
            </div>

            <Button className="mt-4 w-full gap-1" onClick={handleUpload} disabled={isLoading}>
              Upload
              {isLoading && <Loader2Icon className="size-4 animate-spin" />}
            </Button>
          </div>
        )}
      </div>
      <div className="h-full w-1/2 max-w-xl overflow-auto">
        <h1 className="mb-2 text-xl">Files uploaded</h1>
        <div className="mb-4 space-y-2">
          {filesUploaded &&
            filesUploaded?.map((file) => (
              <div
                key={file.fileKey}
                className="cursor-pointer rounded-md border p-3"
                onClick={() => handleSelectFile(file)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{file.originalFileName}</span>
                </div>
              </div>
            ))}

          <Dialog
            open={!!selectedFile}
            onOpenChange={(open) => {
              if (!open) {
                setSelectedFile(null);
              }
            }}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Visualize your image</DialogTitle>
                <DialogDescription>{selectedFile?.originalFileName}</DialogDescription>
                {loadingImage && <Spinner size="large" />}
                <img src={selectedFile?.signedURL} alt="" />
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {loadingFiles && <Spinner size="large" />}
        </div>
      </div>
    </div>
  );
}
