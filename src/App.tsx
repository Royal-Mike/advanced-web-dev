import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/app';
import NotFound from './pages/NotFound/app';

import IA01 from './pages/IA01/app';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tic-tac-toe' element={<IA01 />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  );
}