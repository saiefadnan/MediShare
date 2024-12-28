import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logo from '../assets/logo.png'

const Navbar = () => {
  const login = () => {
    window.location.href = '/login';
  }
  const home = () => {
    window.location.href = "/";
  } 
  return (
    <AppBar position="sticky" sx={{backgroundColor: "#F6EFE4"}}>
      <Toolbar>
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 , color: 'black'}}
        >
          <MenuIcon />
        </IconButton> */}
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,color: 'black', marginLeft: "50px"}}>
          <img src={Logo} alt='Logo' style={{marginRight:'10px'}}></img>
          MediShare
        </Typography>
        <Button sx={{ color: 'black' }} onClick={home}>Home</Button>
        <Button sx={{ color: 'black' }}>About</Button>
        <Button sx={{ color: 'black' }}>Contacts</Button>
        <Button sx={{ color: 'black' }} onClick={login}>Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
