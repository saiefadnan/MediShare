import Navbar from './components/navbar';
import Home from './pages/Home';
import Donation from './pages/Donation';
import LoginPage from './pages/Login';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense } from 'react';

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login'];

  return (
    <div className="App">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/donation' element={<Donation />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
