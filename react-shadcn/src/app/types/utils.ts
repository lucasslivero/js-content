export type WithStatus<T> = T & { status?: 'pending' | 'error' };

export function generateEllipsisPagination(
  currentPage: number,
  totalPages: number,
  surroundingPages = 2,
): (number | string)[] {
  const pages: (number | string)[] = [];

  for (let i = 1; i <= totalPages; i += 1) {
    const isFirstPage = i === 1;
    const isLastPage = i === totalPages;
    const isWithinLowerBound = i >= currentPage - surroundingPages;
    const isWithinUpperBound = i <= currentPage + surroundingPages;
    const isEllipsisPosition =
      i === currentPage - surroundingPages || i === currentPage + surroundingPages;

    if (isEllipsisPosition && !isFirstPage && !isLastPage) {
      pages.push(`ellipsis-${i}`);
      continue;
    }

    if (isFirstPage || isLastPage || (isWithinUpperBound && isWithinLowerBound)) {
      pages.push(i);
    }
  }

  return pages;
}
