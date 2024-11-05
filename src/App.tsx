import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import AuthCallback from './auth/AuthCallback.tsx';
import { Layout } from './components/Layout/Layout';

const About = lazy(() => import('./pages/About'));
const HomePage = lazy(() => import('./pages/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const ExtraPage = lazy(() => import('./pages/ExtraPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/extra" element={<ExtraPage />} />
          <Route path="/callback" element={<AuthCallback />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
