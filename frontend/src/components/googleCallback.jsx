import { useEffect, useRef } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const GoogleCallback = () => {
  const { login } = useAuth();
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    const fetchUserData = async () => {
        console.log('fetchUserData');
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/google/success`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/signup`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: data.user.username,
                email: data.user.email,
                password: null, gateway: 'google',
                image_url: data.user.image_url
              }),
            });
  
            const result = await response.json();
            if (result.success) {
              console.log('User signed up successfully:', result.user);
              login(result.user);
              window.location.href = '/';
            } else {
              console.error('Error signing up user:', result.message);
              window.location.href = '/login';
            }
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