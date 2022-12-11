import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { capitalizeFirstLetter } from 'utils/string';
import classes from './navigation.module.scss';

type NavigationItem = {
  label: string;
  path: string;
};
const navigationItems: NavigationItem[] = [
  {
    label: 'home',
    path: '/',
  },
  {
    label: 'profile',
    path: '/profile',
  },
  {
    label: 'about',
    path: '/about',
  },
];

const Navigation = () => {
  const { pathname } = useRouter();

  return (
    <nav className={classes.navigation}>
      <h1 className={classes.appTitle}>Blog.</h1>

      <ul className={classes.navigationList}>
        {navigationItems.map(({ label, path }) => {
          const isActive = path === pathname;
          return (
            <li
              key={label}
              className={clsx(
                classes.navigationItem,
                isActive && classes.navigationItemActive
              )}
            >
              <Link href={path}>{capitalizeFirstLetter(label)}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
