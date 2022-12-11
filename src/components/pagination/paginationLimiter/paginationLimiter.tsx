import classes from '../pagination.module.scss';

type PaginationLimiterProps = {
  limit: number;
  handleLimitSet: (newLimit: number) => void;
};
const PaginationLimiter = ({
  limit,
  handleLimitSet,
}: PaginationLimiterProps) => {
  return (
    <div className={classes.controlContainer}>
      <label htmlFor="pagination-limiter" className={classes.inputLabel}>
        Limit per page:
      </label>
      <input
        id="pagination-limiter"
        className={classes.numberInput}
        defaultValue={limit}
        onBlur={(event) => {
          const input = event.target as HTMLInputElement;
          const newLimit = parseInt(input.value) || 1;
          handleLimitSet(newLimit);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            const input = event.target as HTMLInputElement;
            const newLimit = parseInt(input.value) || 1;
            handleLimitSet(newLimit);
          }
        }}
      />
    </div>
  );
};

export default PaginationLimiter;
