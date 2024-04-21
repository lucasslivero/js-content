import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { ClientsService } from '../services/ClientsService';

import { usePagination } from './usePagination';

export function useClients(perPage = 10) {
  const { setTotalItems, ...pagination } = usePagination(1, perPage);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['clients', { page: pagination.currentPage, perPage }],
    staleTime: Infinity,
    queryFn: async () => {
      const response = await ClientsService.getAll(pagination.currentPage, perPage);

      setTotalItems(response.items);
      return response;
    },
  });

  useEffect(() => {
    const nextPage = pagination.currentPage + 1;
    queryClient.prefetchQuery({
      queryKey: ['clients', { page: nextPage, perPage }],
      staleTime: Infinity,
      queryFn: async () => {
        const response = await ClientsService.getAll(nextPage, perPage);

        setTotalItems(response.items);
        return response;
      },
    });
  }, [pagination.currentPage, perPage, queryClient, setTotalItems]);

  return {
    clients: data?.data ?? [],
    isLoading,
    pagination,
  };
}
