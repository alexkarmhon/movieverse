import { useAuth0 } from '@auth0/auth0-react';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import LiveTvOutlined from '@mui/icons-material/LiveTvOutlined';
import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';

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

const AuthSection: FC = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: { returnTo: '/' },
    });
  };
  const onLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  if (isAuthenticated) {
    return (
      <Button color="inherit" variant="outlined" onClick={onLogout}>
        Log out
      </Button>
    );
  }
  return (
    <Button color="inherit" variant="outlined" onClick={onLogin}>
      Log in
    </Button>
  );
};

export const Header: FC = () => {
  const { isAuthenticated } = useAuth0();
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
          MovieverseTMDB
        </Typography>
        <Box flexGrow={1}>
          <nav>
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink to="/movies">Movies</HeaderLink>
            <HeaderLink to="/about">About</HeaderLink>
            {isAuthenticated && <HeaderLink to="/extra">Extra</HeaderLink>}
          </nav>
        </Box>
        <AuthSection />
      </Toolbar>
    </AppBar>
  );
};
