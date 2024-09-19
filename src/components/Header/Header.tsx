import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import LiveTvOutlined from '@mui/icons-material/LiveTvOutlined';
import { AppBar, Link, Toolbar, Typography } from '@mui/material';

import styles from './Header.module.scss';

interface HeaderLinkProps {
  children: React.ReactNode;
  to: string;
}

const HeaderLink: FC<HeaderLinkProps> = ({ children, to }) => {
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

export const Header = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#22435e' }}>
      <Toolbar>
        <RouterLink
          to={'/'}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <LiveTvOutlined sx={{ mr: 2 }} />
        </RouterLink>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Movieverse
        </Typography>
        <nav>
          <HeaderLink to="/">Home</HeaderLink>
          <HeaderLink to="/movies">Movies</HeaderLink>
          <HeaderLink to="/about">About</HeaderLink>
        </nav>
      </Toolbar>
    </AppBar>
  );
};
