import type { ReactNode } from 'react';
import Navigation from '../navigation/navigation';

import classes from './layout.module.scss';

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className={classes.layout}>
      <Navigation />

      <div className={classes.contentContainer}>{children}</div>
    </div>
  );
}
