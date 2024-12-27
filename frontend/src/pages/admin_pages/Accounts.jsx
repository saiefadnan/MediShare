import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../dashboard_stuffs/Sidebar";

const Accounts = () => {
    return ( 
    <div className="page91">
        <Box sx={{ display: 'flex', height: '100%'}}>
            <CssBaseline />
            <Sidebar/>
            Accounts
        </Box>
    </div> );
}
 
export default Accounts;