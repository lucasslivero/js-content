import { useMutation, useQuery } from '@tanstack/react-query';
import { EyeIcon, Loader2Icon, PackageOpenIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

import { bytesToMb, cn, mbToBytes } from '@/app/libs/utils';
import { type IFile, UploadFileService } from '@/app/services/uploadFileService';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Progress } from '@/components/ui/Progress';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Spinner } from '@/components/ui/Spinner';

interface IUpload {
  file: File;
  progress: number;
}

export default function FileUploaderPage() {
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

  const { mutateAsync: getFileURL, isPending: loadingImage } = useMutation({
    mutationFn: (data: IFile) => {
      return UploadFileService.getPresignedUrl(data.fileKey, 'GET');
    },
  });

  const { mutateAsync: deleteFile, isPending: isDeletingFIle } = useMutation({
    mutationFn: (data: IFile) => {
      return UploadFileService.deleteFile(data.fileKey);
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

  function updateProgress(progress: number, index: number, accumulator: boolean) {
    setUploads((prevState) => {
      const newState = [...prevState];
      const uploadFile = newState[index];
      const newProgress = progress + (accumulator ? uploadFile.progress : 0);
      newState[index] = {
        ...uploadFile,
        progress: Math.min(Math.round(newProgress), 100),
      };
      return newState;
    });
  }

  async function handleUpload() {
    setIsLoading(true);
    try {
      const uploadFiles = await Promise.all(
        uploads.map(async ({ file }) => {
          if (bytesToMb(file.size) >= 50) {
            const chunkSize = mbToBytes(5);
            const totalChunks = Math.ceil(file.size / chunkSize);

            const { key, parts, uploadId } = await UploadFileService.initiateMPU({
              filename: file.name,
              totalChunks,
            });
            return {
              file,
              chunkSize,
              key,
              parts,
              uploadId,
              multipart: true,
            };
          }

          return {
            file,
            url: await UploadFileService.getPresignedUrl(file.name, 'PUT'),
            multipart: false,
          };
        }),
      );

      // const nonMultiPartsUpload = uploadFiles.filter((item) => !item.multipart);
      // const multiPartUploads = uploadFiles.filter((item) => item.multipart);

      // if (nonMultiPartsUpload.length > 0) {

      // }

      const responses = await Promise.allSettled(
        uploadFiles.map(async ({ file, url, parts, chunkSize, multipart }, index) => {
          if (!multipart) {
            return UploadFileService.uploadFile(url!, file, (progress) =>
              updateProgress(progress, index, false),
            );
          }

          return Promise.all(
            parts!.map(async ({ url: partUrl, partNumber }, partIndex) => {
              const chunkStart = partIndex * chunkSize!;
              const chunkEnd = Math.min(chunkStart + chunkSize!, file.size);

              const fileChunk = file.slice(chunkStart, chunkEnd);

              return UploadFileService.uploadChunk({
                url: partUrl,
                chunk: fileChunk,
                partNumber,
                progressFn: () => updateProgress(100 / parts!.length, index, true),
              });
            }),
          );
        }),
      );

      const mpuActions: Promise<void>[] = [];
      responses.forEach((response, index) => {
        const upload = uploadFiles[index];
        if (upload.multipart) {
          if (response.status === 'rejected') {
            mpuActions.push(
              UploadFileService.abortMPU({
                fileKey: upload.key!,
                uploadId: upload.uploadId!,
              }),
            );
          } else {
            mpuActions.push(
              UploadFileService.completeMPU({
                fileKey: upload.key!,
                uploadId: upload.uploadId!,
                parts: response.value!,
              }),
            );
          }
        }
        if (response.status === 'rejected') {
          // eslint-disable-next-line no-console
          console.log(`O Upload do arquivo ${upload.file.name} falhou`);
        }
      });

      if (mpuActions.length > 0) {
        await Promise.all(mpuActions);
      }

      setUploads([]);
      toast.success('Uploads realizados com sucesso !');
      refetchFiles();
    } catch {
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteFile(file: IFile) {
    await deleteFile(file);
    refetchFiles();
  }

  async function handleSelectFile(file: IFile) {
    setSelectedFile(file);
    const signedURL = await getFileURL(file);
    setSelectedFile({ ...file, signedURL });
  }

  return (
    <div className="flex h-full w-full justify-center gap-4">
      <ScrollArea className="h-full w-1/2 px-4">
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
      </ScrollArea>
      <ScrollArea className="h-full w-1/2 px-4">
        <h1 className="mb-2 text-xl">Files uploaded</h1>
        <div className="mb-4 space-y-2">
          {filesUploaded &&
            filesUploaded?.map((file) => (
              <div key={file.fileKey} className="cursor-pointer rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{file.originalFileName}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <EyeIcon className="size-4" onClick={() => handleSelectFile(file)} />
                    </Button>
                    <Button variant="destructive" size="icon">
                      {isDeletingFIle && <Loader2Icon className="size-4 animate-spin" />}
                      {!isDeletingFIle && (
                        <Trash2Icon className="size-4" onClick={() => handleDeleteFile(file)} />
                      )}
                    </Button>
                  </div>
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
      </ScrollArea>
    </div>
  );
}
