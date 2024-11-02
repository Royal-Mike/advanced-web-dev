import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/app';
import NotFound from './pages/NotFound/app';

import IA01 from './pages/IA01/app';
import IA02 from './pages/IA02/app';
import IA03 from './pages/IA03/app';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tic-tac-toe' element={<IA01 />} />
        <Route path='/unsplash-gallery/*' element={<IA02 />} />
        <Route path='/user-registration/*' element={<IA03 />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  );
}