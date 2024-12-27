import Navbar from './components/navbar';
import Home from './pages/Home';
import UserDashboard from './pages/userDashboard'; // Import UserDashboard component
import UserProfile from './pages/userProfile'; // Import UserProfile component
import UserRequests from './pages/userRequests';
import UserRequested from './pages/userRequested';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import './styles/userGlobal.css';
import './styles/userProfile.css'; 
import './styles/userDash.css'; // Import the CSS file for UserDashboard
import './styles/userRequests.css'; // Import the CSS file for UserDashboard
import { Suspense } from 'react';

function App() {
  return (
    <BrowserRouter>  
      <div className="App">
        {/* Only render Navbar on /home route */}
        {window.location.pathname !== '/userDashboard' && 
        window.location.pathname !== '/userProfile' &&
        window.location.pathname !== '/userRequests' && 
        window.location.pathname !== '/userRequested' && <Navbar />}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/home' element={<Home/>}/>
            <Route path='/userDashboard' element={<UserDashboard/>}/> {/* Route for /userDashboard */}
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/userRequests" element={<UserRequests />} />
            <Route path="/userRequested" element={<UserRequested />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;