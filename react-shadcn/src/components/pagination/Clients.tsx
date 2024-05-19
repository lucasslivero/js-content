import { useMemo } from 'react';

import { useClients } from '@/app/hooks/useClients';
import { generateEllipsisPagination } from '@/app/types/utils';
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination';
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

export function Clients() {
  const {
    clients,
    isLoading,
    pagination: { previousPage, nextPage, setPage, ...pagination },
  } = useClients();

  const pages = useMemo(() => {
    return generateEllipsisPagination(pagination.currentPage, pagination.totalPages);
  }, [pagination]);

  return (
    <div>
      <header className="mb-4 pb-4">
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

          <TableCaption>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={previousPage}
                    disabled={!pagination.hasPreviousPage}
                  />
                </PaginationItem>

                {pages.map((page) => {
                  const isEllipsisPosition = typeof page === 'string';
                  if (isEllipsisPosition) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationButton disabled>
                          <PaginationEllipsis />
                        </PaginationButton>
                      </PaginationItem>
                    );
                  }
                  return (
                    <PaginationItem key={page}>
                      <PaginationButton
                        isActive={pagination.currentPage === page}
                        onClick={() => setPage(page)}
                      >
                        {page}
                      </PaginationButton>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext onClick={nextPage} disabled={!pagination.hasNextPage} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableCaption>
        </Table>
      )}
    </div>
  );
}
