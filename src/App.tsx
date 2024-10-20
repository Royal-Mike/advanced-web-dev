import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/app';
import NotFound from './pages/NotFound/app';

import IA01 from './pages/IA01/app';

const base = '/advanced-web-dev';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path={`${base}/`} element={<Home />} />
        <Route path={`${base}/tic-tac-toe`} element={<IA01 />} />
        <Route path={`${base}/*`} element={<NotFound />} />
      </Routes>
    </div>
  );
}