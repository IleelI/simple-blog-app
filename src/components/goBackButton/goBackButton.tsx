import { useRouter } from 'next/router';
import React from 'react';
import classes from './goBackButton.module.scss';

const GoBackButton = () => {
  const router = useRouter();

  const handleGoBackClick = () => {
    router.back();
  };

  return (
    <button
      type="button"
      className={classes.goBackButton}
      onClick={handleGoBackClick}
    >
      Go back
    </button>
  );
};

export default GoBackButton;
