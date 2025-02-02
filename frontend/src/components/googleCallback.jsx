import { useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const GoogleCallback = () => {
  const { login } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
        console.log('fetchUserData');
      try {
        const response = await fetch('http://localhost:5000/api/user/google/success', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            login(data.user);
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