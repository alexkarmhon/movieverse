import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import { anonymousUser, AuthContext, AuthInfo } from '../../AuthContext';
import { Header } from '../Header/Header';
import styles from './Layout.module.scss';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5',
    },
    secondary: {
      main: '#fbc02d',
    },
    background: {
      default: '#fcfcfc',
      paper: '#fcfcfc',
    },
    text: {
      primary: '#3a3a3a',
      secondary: '#474747',
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h5: {
      fontWeight: 700,
      color: '#fbc02d',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
});

export const Layout = () => {
  const [auth] = useState<AuthInfo>({ user: anonymousUser });
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AuthContext.Provider value={auth}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};
