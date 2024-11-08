import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link } from '@mui/material';

import styles from './Header.module.scss';

interface HeaderLinkProps {
  children: React.ReactNode;
  to: string;
}

export const HeaderLink: FC<HeaderLinkProps> = ({ children, to }) => {
  return (
    <Link
      component={RouterLink}
      to={to}
      className={styles.link}
      variant="button"
      color="inherit"
      sx={{ my: 1, mx: 1.5 }}
    >
      {children}
    </Link>
  );
};
