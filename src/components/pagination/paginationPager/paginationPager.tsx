import classes from '../pagination.module.scss';

type PaginationPagerProps = {
  page: number;
  totalPages: number;
  handleGoToPage: (newPage: number, totalPages: number) => void;
};
const PaginationPager = ({
  page,
  totalPages,
  handleGoToPage,
}: PaginationPagerProps) => {
  return (
    <div className={classes.controlContainer}>
      <label htmlFor="pagination-pager" className={classes.inputLabel}>
        Go to page:
      </label>
      <input
        id="pagination-pager"
        className={classes.numberInput}
        defaultValue={page}
        onBlur={(event) => {
          const input = event.target as HTMLInputElement;
          const newPage = parseInt(input.value) || 1;
          handleGoToPage(newPage, totalPages);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            const input = event.target as HTMLInputElement;
            const newPage = parseInt(input.value) || 1;
            handleGoToPage(newPage, totalPages);
          }
        }}
      />
    </div>
  );
};

export default PaginationPager;
