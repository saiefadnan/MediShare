import Navbar from './components/navbar';
import Home from './pages/Home';
import UserDashboard from './pages/userDashboard';
import UserProfile from './pages/userProfile/userProfile';
import UserRequests from './pages/userRequests';
import UserRequested from './pages/userRequested';
import Donation from './pages/Donation';
import Ai from './pages/Ai';
import LoginPage from './pages/Login';
import FindMedPage from './pages/findMedPage/FindMedPage.jsx';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { StateProvider} from './Contexts/SidebarContext.jsx';
import MedicineSearchResults from './pages/components_MedicineSearchResults';
import CircularUnderLoad from './components/CircularUnderLoad.jsx';
const Admin = lazy(()=>import('./pages/Admin.jsx'));


function App() {
  const location = useLocation();

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
    '/userDashboard',
    '/userProfile',
    '/userRequests', 
    '/userRequested'
  ];

  return (
    <StateProvider>
    <div className="App">
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
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/airesult/*" element={< MedicineSearchResults />} />
        </Routes>
      </Suspense>
      {!hideFooterRoutes.includes(location.pathname) && <Footer/>}
    </div>
    </StateProvider>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
