import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Approach from './pages/Approach';
import Create from './pages/Create';
import Home from './pages/Home';
import Perspective from './pages/Perspective';
import Studio from './pages/Studio';
import Work from './pages/Work';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/perspective" element={<Perspective />} />
          <Route path="/create" element={<Create />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/studio/contact" element={<Studio />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
