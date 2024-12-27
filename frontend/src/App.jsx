import Navbar from './components/navbar';
import Donation from './pages/Donation';
import Ai from './pages/Ai';
import LoginPage from './pages/Login';
import FindMedPage from './pages/findMedPage/FindMedPage.jsx';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import { Suspense } from 'react';
import Admin from './pages/Admin.jsx';

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/admin'];
  // const shouldHideNavbar = hideNavbarRoutes.some(route=>{
  //   return (route === location.pathname || location.pathname.startsWith(`${route}/`))
  // })
  return (

        <div className="App">
          {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/donation' element={<Donation/>}/>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/findMed' element={<FindMedPage/>}/>
              <Route path='/ai' element={<Ai/>}/>
              {/* Admin DashBoard pages */}
              <Route path='/admin/*'  element={<Admin/>}/>
              {/* Admin DashBoard pages */}

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