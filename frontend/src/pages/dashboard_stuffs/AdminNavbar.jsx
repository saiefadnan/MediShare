import { Avatar, Badge, Box, IconButton, Toolbar, Typography, styled } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
// import { StateContext } from "../../Contexts/SidebarContext";
import Logo from '../../assets/medisharelogo.png'
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationPanel from "./NotificationPanel";
import { useContext, useEffect, useState } from "react";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import axios from "axios";
import { useAuth } from "../../Contexts/AuthContext";
import useFetch from "../../hooks/useFetch";

const AdminNavbar = ({Open}) => {
    const {user} = useAuth();
    const {data, isPending, error} = useFetch('http://localhost:5000/api/admin/fetch-image',{id: user?.id});
    console.log(data?.image_url)
    const [image, setImage] = useState(null);
    const drawerWidth = 240;
    const [open, setOpen] = Open;
    // const {open, setOpen} = useContext(StateContext);
    const [openNotif,setOpenNotif] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    
    useEffect(()=>{
        setImage(data);
    },[data])


    // const AppBar = styled(MuiAppBar, {
    // shouldForwardProp: (prop) => prop !== 'open',})(({ theme }) => ({
    //     zIndex: theme.zIndex.drawer + 1,
    //     height: '65px',
    //     transition: theme.transitions.create(['width', 'margin'], {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.leavingScreen,
    //     }),
    //     variants: [
    //     {
    //         props: ({ open }) => open,
    //         style: {
    //         marginLeft: drawerWidth,
    //         width: `calc(100% - ${drawerWidth}px)`,
    //         height: '65px',
    //         transition: theme.transitions.create(['width', 'margin'], {
    //             easing: theme.transitions.easing.sharp,
    //             duration: theme.transitions.duration.enteringScreen,
    //         }),
    //         },
    //     },
    //     ],
    // }));

    const handleSelectImage = async(event)=>{
        const file = event.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file); // Preview image
          setImage(imageUrl);
        }
        
        const formData = new FormData();
        formData.append("image", file); 
        formData.append("email", user.email);

        try {
        const response = await axios.post("http://localhost:5000/api/admin/image-upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }, 
        });

        console.log("File uploaded successfully:", response.data);
        } catch (error) {
        console.error("Error uploading file:", error);
        }
  };

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open', // Prevent forwarding the `open` prop to the DOM
      })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        height: '65px',
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
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
        <AppBar position="fixed" open={open} sx={{backgroundColor: "#F6EFE4", }}>
            <Toolbar>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={[
            {
                marginRight: 1,
                color: 'black'
            },
            open && { display: 'none' },
            ]}>
                <MenuIcon />
            </IconButton>
            <Box variant="h5" component="div" sx={{ 
                flexGrow: 1,
                color: 'black',
                display: 'flex',
                alignItems: 'center',
                }}>
                <img src={Logo} alt='Logo' style={{marginRight:'5px',width: '50px',height: 'auto',}}/>
                <Typography 
                sx={{
                    fontFamily:'Outfit', 
                    fontWeight: '600', 
                    fontSize: '20px',
                }}>MediShare</Typography>
            </Box>
           
            <IconButton onClick={handleToggleScreen}>
                {fullscreen?<FullscreenExitIcon/>:<FullscreenIcon/> }
            </IconButton>
            <IconButton color="black" onClick={handlePanel}>
                <Badge badgeContent={4} color="error">
                    <NotificationsIcon/> 
                </Badge>
            </IconButton>
        <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="file-input"
            onChange={handleSelectImage}
        />
      <label htmlFor="file-input">
        <IconButton component="span" color="inherit">
          <Avatar src={image} alt="avatar" sx={{ width: 50, height: 50 }} />
        </IconButton>
    </label>
        {openNotif && <NotificationPanel Open={[openNotif,setOpenNotif]} />}
        </Toolbar>
    </AppBar> 
);
}
 
export default AdminNavbar;