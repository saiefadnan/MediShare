import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logo from '../assets/medisharelogo.png'

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
        
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 ,color: 'black', marginLeft: "50px"}}>
          <span style={{display: 'flex', alignItems: 'center'}}><img src={Logo} alt='Logo' style={{marginRight:'5px', width: '3.5%'}}></img>
          <text style={{fontFamily:'Outfit', fontWeight: '600'}}>MediShare</text></span>
        </Typography>
        <Button sx={{ color: 'black' }} onClick={home} style={{fontFamily: 'Outfit', color:'#1E1E1E'}}>Home</Button>
        <Button sx={{ color: 'black' }} style={{fontFamily: 'Outfit', color:'#1E1E1E'}}>About</Button>
        <Button sx={{ color: 'black' }} style={{fontFamily: 'Outfit', color:'#1E1E1E'}}>Contacts</Button>
        <Button sx={{ color: 'black' }} onClick={login} style={{fontFamily: 'Outfit', color:'#1E1E1E'}}>Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
