import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';

// import About from './pages/About';
// import Homepage from './pages/Homepage';
// import Moviespage from './pages/Moviespage';

const About = lazy(() => import('./pages/About'));
const Homepage = lazy(() => import('./pages/Homepage.tsx'));
const Moviespage = lazy(() => import('./pages/Moviespage.tsx'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/movies" element={<Moviespage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
