import { Route, Routes } from 'react-router-dom';

import './App.css';

import { Layout } from './components/Layout/Layout';
import About from './pages/About';
import Homepage from './pages/Homepage';
import Movies from './pages/Movies';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/movies" element={<Movies />} />
      </Route>
    </Routes>
  );
}

export default App;
