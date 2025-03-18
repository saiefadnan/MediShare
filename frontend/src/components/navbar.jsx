import {useState} from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../../public/assets/medisharelogo.png'

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const login = () => {
    navigate('/login');
  }
  const home = () => {
    navigate('/');
  } 
  const profile = () => {
    navigate('/userDashboard');
  }
  const admin = () => {
    navigate('/admin/dashboard');
  }

  const about = () => {
    window.location.href = "/about";
  } 

  const contacts = () => {
    window.location.href = "/contacts";
  } 
  return (
    <AppBar position="sticky" sx={{backgroundColor: "#F6EFE4"}}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 ,color: 'black', marginLeft: "50px"}} onClick={home} style={{cursor: 'pointer'}}>
          <span style={{display: 'flex', alignItems: 'center'}}><img src={Logo} alt='Logo' style={{marginRight:'5px', width: '3.5%'}}></img>
          <text style={{fontFamily:'Outfit', fontWeight: '600'}}>MediShare</text></span>
        </Typography>
        <Button sx={{ color: 'black' }} onClick={home} style={{fontFamily: 'Outfit', color:'#1E1E1E'}}>Home</Button>
        <Button onClick={about} sx={{ color: 'black' }} style={{fontFamily: 'Outfit', color:'#1E1E1E'}}>About</Button>
        <Button onClick={contacts} sx={{ color: 'black' }} style={{fontFamily: 'Outfit', color:'#1E1E1E'}}>Contacts</Button>
        {user ? (
          <>
            <Avatar
              sx={{ bgcolor: '#304E42', cursor: 'pointer' }}
              onClick={handleAvatarClick}
              src={user.image_url ? user.image_url : undefined}
            >
              {!user.image_url && user.username[0]}
            </Avatar>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={profile}>Profile</MenuItem>
              {user.role === 'admin' && <MenuItem onClick={admin}>Admin</MenuItem>}
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            sx={{ color: 'black' }}
            onClick={() =>{
              login();
            }}
            style={{ fontFamily: 'Outfit', color: '#1E1E1E' }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
