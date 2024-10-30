import { FC, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import LiveTvOutlined from '@mui/icons-material/LiveTvOutlined';
import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';

import { anonymousUser, AuthContext } from '../../AuthContext';
import styles from './Header.module.scss';

interface HeaderProps {
  onLogout: () => void;
  onLogin: () => void;
}

interface HeaderLinkProps {
  children: React.ReactNode;
  to: string;
}

interface AuthSectionProps {
  condition: boolean;
  onLogout: () => void;
  onLogin: () => void;
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

const AuthSection: FC<AuthSectionProps> = ({
  condition,
  onLogout,
  onLogin,
}) => {
  if (condition) {
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

export const Header: FC<HeaderProps> = ({ onLogout, onLogin }) => {
  const { user } = useContext(AuthContext);
  const isLoggedIn = user !== anonymousUser;

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
            {isLoggedIn && <HeaderLink to="/extra">Extra</HeaderLink>}
          </nav>
        </Box>
        <AuthSection
          condition={isLoggedIn}
          onLogout={onLogout}
          onLogin={onLogin}
        />
      </Toolbar>
    </AppBar>
  );
};
