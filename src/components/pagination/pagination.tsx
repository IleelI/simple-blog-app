import clsx from 'clsx';
import type usePagination from 'hooks/usePagination';
import classes from './pagination.module.scss';
import PaginationLimiter from './paginationLimiter/paginationLimiter';
import PaginationPager from './paginationPager/paginationPager';

type PaginationProps = {
  pagination: ReturnType<typeof usePagination>;
  total: number;
};
const Pagination = ({ total, pagination }: PaginationProps) => {
  const {
    page,
    limit,
    isPrevPageDisabled,
    handleGoToPage,
    handlePrevPage,
    handleNextPage,
    handleLimitSet,
  } = pagination;

  const totalItems = total ?? 0;
  const totalPages = Math.ceil(totalItems / limit);
  const isNextPageDisabled = page >= totalPages;

  return (
    <div className={classes.paginationContainer}>
      <div className={classes.pagination}>
        <button
          type="button"
          className={clsx(classes.button, classes.buttonSecondary)}
          disabled={isPrevPageDisabled}
          onClick={handlePrevPage}
        >
          Prev page
        </button>
        <p className={classes.page}>
          {page}/{totalPages}
        </p>
        <button
          type="button"
          className={classes.button}
          disabled={isNextPageDisabled}
          onClick={handleNextPage}
        >
          Next page
        </button>
      </div>

      <div className={classes.paginationControls}>
        <PaginationPager
          page={page}
          totalPages={totalPages}
          handleGoToPage={handleGoToPage}
        />
        <PaginationLimiter limit={limit} handleLimitSet={handleLimitSet} />
      </div>
    </div>
  );
};

export default Pagination;
