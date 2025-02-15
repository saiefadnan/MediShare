import { Navigate, Route, Routes } from "react-router-dom";
import AdminPortal from "./admin_pages/AdminPortal";
import CollectionPortal from "./admin_pages/CollectionPortal";
import DonationPortal from "./admin_pages/DonationPortal";
import Chat from "./admin_pages/Chat";
import AccountsPortal from "./admin_pages/AccountsPortal";
import Review from "./admin_pages/Review";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./dashboard_stuffs/Sidebar";
import AdminNavbar from "./dashboard_stuffs/AdminNavbar";
// import { StateProvider } from "../Contexts/SidebarContext";
import { useState } from "react";

const Admin = () => {
    const [open, setOpen] = useState(false);
    return (
        // <StateProvider>
        <div className="page91">
            <Box sx={{ display: 'flex', height: '100%'}}>
                <CssBaseline />
                <AdminNavbar Open = {[open , setOpen]}/>
                <Sidebar Open = {[open , setOpen]}/>
                <Routes>
                    <Route path='/' element={<Navigate to={'/admin/dashboard'}/>}/>
                    <Route path='/dashboard' element={<AdminPortal/>}/>
                    {/* <Route path='/collection'  element={<CollectionPortal/>}/> */}
                    <Route path='/donation'  element={<DonationPortal/>}/>
                    <Route path='/chat'  element={<Chat/>}/>
                    <Route path='/accounts'  element={<AccountsPortal/>}/>
                    <Route path='/review'  element={<Review/>}/>
                </Routes> 
            </Box>
        </div>
        // </StateProvider>
    );
}
 
export default Admin;


 // const shouldHideNavbar = hideNavbarRoutes.some(route=>{
  //   return (route === location.pathname || location.pathname.startsWith(`${route}/`))
  // })