import { useCallback, useState } from 'react';

export default function usePagination(inputPage = 1, inputLimit = 10) {
  const [page, setPage] = useState(inputPage);
  const [limit, setLimit] = useState(inputLimit);
  const isPrevPageDisabled = page <= 1;

  const handleNextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const handlePrevPage = useCallback(() => {
    setPage((prevPage) => (isPrevPageDisabled ? prevPage : prevPage - 1));
  }, [isPrevPageDisabled]);

  const handleGoToPage = useCallback((page: number, totalPages: number) => {
    if (page > totalPages) {
      setPage(totalPages);
    } else if (page < 1) {
      setPage(1);
    } else {
      setPage(page);
    }
  }, []);

  const handleLimitSet = useCallback((newLimit: number) => {
    if (newLimit < 0) {
      setLimit(1);
    } else {
      setLimit(newLimit);
    }
    setPage(1);
  }, []);

  return {
    page,
    limit,
    isPrevPageDisabled,
    handlePrevPage,
    handleNextPage,
    handleGoToPage,
    handleLimitSet,
  };
}
