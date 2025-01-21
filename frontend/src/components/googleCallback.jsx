import { useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const GoogleCallback = () => {
  const { login } = useAuth();

  useEffect(() => {
    // Function to fetch user data after OAuth redirect
    const fetchUserData = async () => {
        console.log('fetchUserData');
      try {
        const response = await fetch('http://localhost:5000/api/user/google/success', {
          credentials: 'include' // Important for cookies/session
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            // Update AuthContext with Google user data
            login(data.user);
            // Redirect to home or dashboard
            window.location.href = '/';
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        window.location.href = '/login';
      }
    };

    fetchUserData();
  }, [login]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );
};

export default GoogleCallback;