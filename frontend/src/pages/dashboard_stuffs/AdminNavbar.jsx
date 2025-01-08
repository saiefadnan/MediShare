import { Avatar, Badge, Box, IconButton, Toolbar, styled } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import { StateContext } from "../../Contexts/SidebarContext";
import Logo from '../../assets/medisharelogo.png'
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationPanel from "./NotificationPanel";
import { useContext, useEffect, useState } from "react";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

const AdminNavbar = () => {
    const drawerWidth = 240;
    const {open, setOpen} = useContext(StateContext);
    const [openNotif,setOpenNotif] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);

    const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',})(({ theme }) => ({
        zIndex: theme.zIndex.drawer + 1,
        height: '65px',
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        variants: [
        {
            props: ({ open }) => open,
            style: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            height: '65px',
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            },
        },
        ],
    }));
    const handleToggleScreen = ()=>{
        if(document.fullscreenElement){
            document.exitFullscreen();
        }
        else{
            document.documentElement.requestFullscreen();
        }
    }
    const handleFullscreen = ()=>{
        setFullscreen(!fullscreen);
        console.log(fullscreen);
    }
    const handleDrawer = () => {
        setOpen(!open);
    };
    const handlePanel = () =>{
        setOpenNotif(!openNotif);
    }

    useEffect(()=>{
        document.addEventListener("fullscreenchange", handleFullscreen);
        return()=>{
            document.removeEventListener("fullscreenchange", handleFullscreen);
        }
    },[fullscreen])

    return ( 
        <AppBar position="fixed" open={open} sx={{backgroundColor: "#F6EFE4"}}>
            <Toolbar>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={[
            {
                marginRight: 5,
                color: 'black'
            },
            open && { display: 'none' },
            ]}>
            <MenuIcon />
            </IconButton>
            <Box variant="h5" component="div" sx={{ flexGrow: 1 ,color: 'black', marginLeft: "30px",}}>
                <img src={Logo} alt='Logo' style={{marginRight:'5px',width: '50px',height: 'auto',}}/>
                <text style={{fontFamily:'Outfit', fontWeight: '600', fontSize: '20px'}}>MediShare</text>
            </Box>
            <IconButton onClick={handleToggleScreen}>
                {fullscreen?<FullscreenExitIcon/>:<FullscreenIcon/> }
            </IconButton>
            <IconButton color="black" onClick={handlePanel}>
                <Badge badgeContent={4} color="error">
                    <NotificationsIcon/>
                    {openNotif && <NotificationPanel/>}
                </Badge>
            </IconButton>
            <IconButton color="inherit">
                <Avatar src="/src/assets/avatar.png"/>
            </IconButton>
            </Toolbar>
        </AppBar> 
    );
}
 
export default AdminNavbar;