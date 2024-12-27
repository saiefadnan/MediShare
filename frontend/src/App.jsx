import Navbar from './components/navbar';
import Donation from './pages/Donation';
import Ai from './pages/Ai';
import LoginPage from './pages/Login';
import FindMedPage from './pages/findMedPage/FindMedPage.jsx';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import AdminPortal from './pages/admin_pages/AdminPortal.jsx';
import CollectionChart from './pages/admin_pages/CollectionChart.jsx';
import DonationChart from './pages/admin_pages/DonationChart.jsx';
import Chat from './pages/admin_pages/Chat.jsx';
import Accounts from './pages/admin_pages/Accounts.jsx';
import Review from './pages/admin_pages/Review.jsx';

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

              {/* Admin DashBoard pages */}
              <Route path='/admin-portal'  element={<AdminPortal/>}/>
              <Route path='/collection-chart'  element={<CollectionChart/>}/>
              <Route path='/donation-chart'  element={<DonationChart/>}/>
              <Route path='/chat'  element={<Chat/>}/>
              <Route path='/accounts'  element={<Accounts/>}/>
              <Route path='/review'  element={<Review/>}/>
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