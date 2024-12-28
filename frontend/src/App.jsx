import Navbar from './components/navbar';
import Home from './pages/Home';
import UserDashboard from './pages/userDashboard'; // Import UserDashboard component
import UserProfile from './pages/userProfile'; // Import UserProfile component
import UserRequests from './pages/userRequests';
import UserRequested from './pages/userRequested';
import Donation from './pages/Donation';
import Ai from './pages/Ai';
import LoginPage from './pages/Login';
import FindMedPage from './pages/findMedPage/FindMedPage.jsx';
import Admin from './pages/Admin.jsx';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { StateProvider} from './Contexts/SidebarContext.jsx';
import './styles/userGlobal.css';
import './styles/userProfile.css'; 
import './styles/userDash.css'; // Import the CSS file for UserDashboard
import './styles/userRequests.css'; // Import the CSS file for UserDashboard

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

  return (
    <StateProvider>
    <div className="App">
      {/* Show Navbar only if the current route is not in the `hideNavbarRoutes` */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Suspense fallback={<div>Loading...</div>}>
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
        </Routes>
      </Suspense>
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
