import { useAuth0 } from '@auth0/auth0-react';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import LiveTvOutlined from '@mui/icons-material/LiveTvOutlined';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import { AuthSection } from './AuthSection';
import { HeaderLink } from './HeaderLink';

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
