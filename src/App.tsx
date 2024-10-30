import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';

const About = lazy(() => import('./pages/About'));
const Homepage = lazy(() => import('./pages/Homepage.tsx'));
const Moviespage = lazy(() => import('./pages/Moviespage.tsx'));
const Extrapage = lazy(() => import('./pages/Extrapage.tsx'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/movies" element={<Moviespage />} />
          <Route path="/extra" element={<Extrapage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
