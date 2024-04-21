import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function usePagination(initialPage = 1, perPage = 10) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get('page');
    if (!page) {
      return initialPage;
    }
    return Number(page);
  });
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / perPage);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  useEffect(() => {
    setSearchParams((prevState) => ({ ...prevState, page: currentPage.toString() }));
  }, [currentPage, setSearchParams]);

  const nextPage = useCallback(() => {
    setCurrentPage((prevState) => prevState + 1);
  }, []);

  const previousPage = useCallback(() => {
    setCurrentPage((prevState) => prevState - 1);
  }, []);

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    currentPage,
    nextPage,
    previousPage,
    setPage,
    setTotalItems,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
}
