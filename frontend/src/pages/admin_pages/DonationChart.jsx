import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../dashboard_stuffs/Sidebar";

const  DonationChart= () => {
    return ( 
    <div className="page91">
        <Box sx={{ display: 'flex', height: '100%'}}>
            <CssBaseline />
            <Sidebar/>
            Donation
        </Box>
    </div>)
}
 
export default DonationChart;