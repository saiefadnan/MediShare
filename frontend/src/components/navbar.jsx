import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assets/logo.png'

const Navbar = () => {
  const login = () => {
    window.location.href = '/login';
  }
  return (
    <AppBar position="static" sx={{backgroundColor: "#F6EFE4"}}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 , color: 'black'}}
        >
          <MenuIcon />
        </IconButton>
        <img src={Logo} alt='Logo' style={{marginRight:'10px'}}></img>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,color: 'black'}}>
          MediShare
        </Typography>
        <Button sx={{ color: 'black' }}>Home</Button>
        <Button sx={{ color: 'black' }}>About</Button>
        <Button sx={{ color: 'black' }}>Contacts</Button>
        <Button sx={{ color: 'black' }} onClick={login}>Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
