import { useEffect, useRef } from 'react';

import { useClientsInfinity } from '@/app/hooks/useClientsInfinity';
import { cn } from '@/app/libs/utils';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';

export function ClientsInfinity() {
  const { clients, isLoading, nextPage, hasNextPage, isFetchingNextPage } = useClientsInfinity();

  const tableCaptionRef = useRef<null | HTMLTableCaptionElement>(null);

  useEffect(() => {
    if (!tableCaptionRef.current) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        const { isIntersecting } = entries[0];

        if (!hasNextPage) {
          obs.disconnect();
          return;
        }

        if (isIntersecting && !isFetchingNextPage) {
          nextPage();
        }
      },
      {
        rootMargin: '20%',
      },
    );
    observer.observe(tableCaptionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoading, hasNextPage, nextPage, isFetchingNextPage]);

  return (
    <div>
      <header className="mb-6 pb-10">
        <h1 className="text-3xl font-bold">Clientes</h1>
      </header>

      {isLoading && (
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      )}

      {!isLoading && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Data de entrada</TableHead>
              <TableHead>Tipo de veículo</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="flex items-center gap-2">
                  <img src={client.avatar} alt={client.name} className="h-10 w-10 rounded-full" />
                  <div>
                    <strong>{client.name}</strong>
                    <small className="block text-muted-foreground">{client.email}</small>
                  </div>
                </TableCell>

                <TableCell>{client.createdAt}</TableCell>

                <TableCell>{client.vehicleType}</TableCell>

                <TableCell>{client.vehicleManufacturer}</TableCell>

                <TableCell>{client.vehicleModel}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableCaption ref={tableCaptionRef} className={cn(!isFetchingNextPage && 'm-0 h-0 w-0')}>
            {isFetchingNextPage && (
              <span className="text-muted-foreground">Carregando mais dados</span>
            )}
          </TableCaption>
        </Table>
      )}
    </div>
  );
}
