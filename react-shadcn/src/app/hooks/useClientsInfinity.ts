import { useInfiniteQuery } from '@tanstack/react-query';

import { ClientsService } from '../services/clientsService';

export function useClientsInfinity(perPage = 10) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['clients', perPage],
    staleTime: Infinity,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => ClientsService.getAll(pageParam, perPage),
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalPages = Math.ceil(lastPage.items / perPage);
      const isLastPage = allPages.length >= totalPages;

      if (isLastPage) {
        return null;
      }

      return lastPageParam + 1;
    },
  });

  const clients = data?.pages.flatMap((page) => page.data);

  return {
    clients: clients ?? [],
    isLoading,
    nextPage: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
