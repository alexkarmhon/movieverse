import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LinearProgress } from '@mui/material';

import AuthCallback from './auth/AuthCallback.tsx';
import { AuthGuard } from './auth/AuthGuard.tsx';
import { Layout } from './components/Layout/Layout';

// import Profile from './components/Profile/Profile.tsx';

const About = lazy(() => import('./pages/About'));
const HomePage = lazy(() => import('./pages/Home'));
const MoviesPage = lazy(() => import('./pages/Moviespage'));
const ExtraPage = lazy(() => import('./pages/Extra'));
const Profile = lazy(() => import('./components/Profile/Profile.tsx'));
const Protected = lazy(() => import('./components/Protected/Protected.tsx'));

function App() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/extra" element={<ExtraPage />} />
          <Route path="/callback" element={<AuthCallback />} />
          <Route path="/profile" element={<AuthGuard component={Profile} />} />
          <Route
            path="/protected"
            element={<AuthGuard component={Protected} />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
