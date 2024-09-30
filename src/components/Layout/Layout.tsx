import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import { anonymousUser, AuthContext, AuthInfo } from '../../AuthContext';
import { Header } from '../Header/Header';
import styles from './Layout.module.scss';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5', // Глибокий синій
    },
    secondary: {
      main: '#fbc02d', // Яскраво-жовтий
    },
    background: {
      default: '#fcfcfc', // Темний фон
      paper: '#fcfcfc', // Темно-сірі елементи
    },
    text: {
      primary: '#3a3a3a', // Білий текст
      secondary: '#474747', // Світло-сірий текст
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h5: {
      fontWeight: 700,
      color: '#fbc02d', // Яскраво-жовтий заголовок
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
});

const fakeAuth: AuthInfo = {
  user: { name: 'Alex' },
};

export const Layout = () => {
  const [auth, setAuth] = useState<AuthInfo>({ user: anonymousUser });
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AuthContext.Provider value={auth}>
        <Header
          onLogout={() => setAuth({ user: anonymousUser })}
          onLogin={() => setAuth(fakeAuth)}
        />
        <main className={styles.main}>
          <Outlet />
        </main>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};
