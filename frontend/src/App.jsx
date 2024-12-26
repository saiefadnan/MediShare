import Navbar from './components/navbar';
import Donation from './pages/Donation';
import Ai from './pages/Ai';
import LoginPage from './pages/Login';
<<<<<<< HEAD

import FindMedPage from './pages/findMedPage/FindMedPage.jsx';


import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

=======
import FindMedPage from './pages/FindMedPage';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
>>>>>>> fb10eb0568c2d2c92935ed25057fca9655ad1d1d
import { Suspense } from 'react';
import Admin from './pages/Admin';

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login'];

  return (

        <div className="App">
          {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' element={<Navigate to='/login'/>}/>
              <Route path='/donation' element={<Donation/>}/>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/findMed' element={<FindMedPage/>}/>
              <Route path='/ai' element={<Ai/>}/>
              <Route path='/admin'  element={<Admin/>}/>
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