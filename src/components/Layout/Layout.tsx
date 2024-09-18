import { Outlet } from 'react-router-dom';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { teal } from '@mui/material/colors';

import { Header } from '../Header/Header';
import styles from './Layout.module.scss';

const defaultTheme = createTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#96000f',
    },
  },
});

export const Layout = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </ThemeProvider>
  );
};
