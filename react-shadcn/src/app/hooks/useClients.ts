import { useQuery } from '@tanstack/react-query';

import { ClientsService } from '../services/ClientsService';

export function useClients() {
  const { data, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: ClientsService.getAll,
  });

  return {
    clients: data ?? [],
    isLoading,
  };
}
