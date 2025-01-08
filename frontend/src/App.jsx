import Navbar from './components/navbar';
import Home from './pages/Home';
import UserDashboard from './pages/userDashboard'; // Import UserDashboard component
import UserProfile from './pages/userProfile/userProfile'; // Import UserProfile component
import UserRequests from './pages/userRequests';
import UserRequested from './pages/userRequested';
import Donation from './pages/Donation';
import Ai from './pages/Ai';
import AboutUs from './pages/AboutPage';
import LoginPage from './pages/Login';
import Contacts from './pages/ContactsPage.jsx';
Contacts
import FindMedPage from './pages/findMedPage/FindMedPage.jsx';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import MedicineSearchResults from './pages/components_MedicineSearchResults';
import CircularUnderLoad from './components/CircularUnderLoad.jsx';
const Admin = lazy(()=>import('./pages/Admin.jsx'));


function App() {
  const location = useLocation();

  // Define routes where the Navbar should not be displayed
  const hideNavbarRoutes = [
    '/login',
    '/userDashboard',
    '/userProfile',
    '/userRequests',
    '/userRequested',
    '/admin/dashboard',
    '/admin/collection',
    '/admin/donation',
    '/admin/review',
    '/admin/accounts',
    '/admin/chat',
    
  ];

  const hideFooterRoutes = [
    '/login',
    '/admin/dashboard',
    '/admin/collection',
    '/admin/donation',
    '/admin/review',
    '/admin/accounts',
    '/admin/chat',
  ];

  return (
    <div className="App">
      {/* Show Navbar only if the current route is not in the `hideNavbarRoutes` */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Suspense fallback={<div className='circularunderload-container'><CircularUnderLoad/></div>}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/userRequests" element={<UserRequests />} />
          <Route path="/userRequested" element={<UserRequested />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/findMed" element={<FindMedPage />} />
          <Route path="/ai" element={<Ai />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contacts" element={<Contacts/>} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/airesult/*" element={< MedicineSearchResults />} />
        </Routes>
      </Suspense>
      {!hideFooterRoutes.includes(location.pathname) && <Footer/>}
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
