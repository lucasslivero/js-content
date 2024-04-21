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
    queryFn: () => ClientsService.getAll(pagination.currentPage, perPage),
  });

  useEffect(() => {
    const nextPage = pagination.currentPage + 1;
    queryClient.prefetchQuery({
      queryKey: ['clients', { page: nextPage, perPage }],
      staleTime: Infinity,
      queryFn: () => ClientsService.getAll(nextPage, perPage),
    });
  }, [pagination.currentPage, perPage, queryClient, setTotalItems]);

  useEffect(() => {
    if (data?.data) {
      setTotalItems(data.items);
    }
  }, [data, setTotalItems]);

  return {
    clients: data?.data ?? [],
    isLoading,
    pagination,
  };
}
