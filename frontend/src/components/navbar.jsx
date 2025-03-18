import {useEffect, useRef, useState} from 'react';
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
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from "@mui/material/useMediaQuery";


const Navbar = () => {
  const minScreen = useMediaQuery("(max-width: 900px)");
  const [drawer, setDrawer] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const boxRef = useRef(null);
  const handleOutsideClick = (e)=>{
      if(boxRef.current && !boxRef.current.contains(e.target)){
          setDrawer(false);
      }
  }

  
  useEffect(()=>{
    document.addEventListener("mousedown", handleOutsideClick);
    return(()=>{
        document.removeEventListener("mousedown", handleOutsideClick);
    })
  },[])

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () =>{
    setDrawer(!drawer);
  }

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
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 ,color: 'black', marginLeft: "10px"}} onClick={home} style={{cursor: 'pointer'}}>
          <span style={{display: 'flex', alignItems: 'center'}}>
            <img src={Logo} alt='Logo' style={{marginRight:'5px',width: '50px',height: 'auto',}}/>
            <text style={{fontFamily:'Outfit', fontWeight: '600'}}>MediShare</text>
          </span>
        </Typography>
        {!minScreen &&
        <Box>
          <Button sx={{ color: 'black' }} onClick={home} style={{fontFamily: 'Outfit', color:'#1E1E1E'}}>Home</Button>
          <Button onClick={about} sx={{ color: 'black' }} style={{fontFamily: 'Outfit', color:'#1E1E1E'}}>About</Button>
          <Button onClick={contacts} sx={{ color: 'black' }} style={{fontFamily: 'Outfit', color:'#1E1E1E'}}>Contacts</Button>
        </Box>
        } 
        {drawer && minScreen &&
          <Box
          ref={boxRef} 
          sx={{
            display:'flex',
            flexDirection: 'column',
            position: 'fixed',
            top: '15%',
            right: '-10px',
            transform: 'translate(-50%,-50%)',
            width: 100,
            height: 'auto',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
            borderRadius: 1,
        }}>
            <Button sx={{ color: 'black' }} onClick={home} style={{fontFamily: 'Outfit', color:'#1E1E1E'}}>Home</Button>
            <Button onClick={about} sx={{ color: 'black' }} style={{fontFamily: 'Outfit', color:'#1E1E1E'}}>About</Button>
            <Button onClick={contacts} sx={{ color: 'black' }} style={{fontFamily: 'Outfit', color:'#1E1E1E'}}>Contacts</Button>
            {!user && <Button
            sx={{ color: 'black' }}
            onClick={() =>{
              login();
            }}
            style={{ fontFamily: 'Outfit', color: '#1E1E1E' }}
          >
            Login
          </Button>}
          </Box>
        }
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
          !minScreen?(<Button
            sx={{ color: 'black' }}
            onClick={() =>{
              login();
            }}
            style={{ fontFamily: 'Outfit', color: '#1E1E1E' }}
          >
            Login
          </Button>
        ):null)}
        <IconButton 
          edge="end" 
          sx={{ display: { xs: 'block', md: 'none' }, color: 'black' }} 
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
