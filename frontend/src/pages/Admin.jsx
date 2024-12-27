import { Navigate, Route, Routes } from "react-router-dom";
import AdminPortal from "./admin_pages/AdminPortal";
import CollectionPortal from "./admin_pages/CollectionPortal";
import DonationPortal from "./admin_pages/DonationPortal";
import Chat from "./admin_pages/Chat";
import AccountsPortal from "./admin_pages/AccountsPortal";
import Review from "./admin_pages/Review";
import { Box, CssBaseline, IconButton, Toolbar } from "@mui/material";
import Sidebar from "./dashboard_stuffs/Sidebar";
import { useState } from "react";
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

const Admin = () => {
    const drawerWidth = 240;
    const [open, setOpen] = useState(false);
    // const AppBar = styled(MuiAppBar, {
    //     shouldForwardProp: (prop) => prop !== 'open',
    //   })(({ theme }) => ({
    //     zIndex: theme.zIndex.drawer + 1,
    //     transition: theme.transitions.create(['width', 'margin'], {
    //       easing: theme.transitions.easing.sharp,
    //       duration: theme.transitions.duration.leavingScreen,
    //     }),
    //     variants: [
    //       {
    //         props: ({ open }) => open,
    //         style: {
    //           marginLeft: drawerWidth,
    //           width: `calc(100% - ${drawerWidth}px)`,
    //           transition: theme.transitions.create(['width', 'margin'], {
    //             easing: theme.transitions.easing.sharp,
    //             duration: theme.transitions.duration.enteringScreen,
    //           }),
    //         },
    //       },
    //     ],
    //   }));
    // const handleDrawer = () => {
    //     setOpen(!open);
    // };
    return (
    <div className="page91">
        <Box sx={{ display: 'flex', height: '100%'}}>
            <CssBaseline />
            {/* <AppBar position="fixed" open={open}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawer}
                    edge="start"
                    sx={[
                    {
                        marginRight: 5,
                    },
                    open && { display: 'none' },
                    ]}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Mini variant drawer
                </Typography>
                </Toolbar>
            </AppBar> */}
            <Sidebar/>
            <Routes>
                <Route path='/' element={<Navigate to={'/admin/dashboard'}/>}/>
                <Route path='/dashboard' element={<AdminPortal/>}/>
                <Route path='/collection'  element={<CollectionPortal/>}/>
                <Route path='/donation'  element={<DonationPortal/>}/>
                <Route path='/chat'  element={<Chat/>}/>
                <Route path='/accounts'  element={<AccountsPortal/>}/>
                <Route path='/review'  element={<Review/>}/>
            </Routes> 
        </Box>
    </div>);
}
 
export default Admin;