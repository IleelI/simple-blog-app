import clsx from 'clsx';
import Link from 'next/link';
import type { ReactNode } from 'react';
import baseClasses from './baseLink.module.scss';

type BaseLinkProps = {
  to: string;
  children: ReactNode;
  classes?: string;
};
const BaseLink = ({ to, children, classes = '' }: BaseLinkProps) => {
  return (
    <span className={clsx(baseClasses.link, classes)}>
      <Link href={to}>{children}</Link>
    </span>
  );
};

export default BaseLink;
