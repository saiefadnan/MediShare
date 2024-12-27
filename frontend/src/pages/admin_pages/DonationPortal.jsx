import { Box, CssBaseline, Typography } from "@mui/material";
import DonationTable from "../dashboard_stuffs/DonationTable";
import DonationChart from "../dashboard_stuffs/Donationchart";
import DonationPie from "../dashboard_stuffs/DonationPie";


const  DonationPortal= () => {
    return ( 
    <Box component="main" sx={{ display: 'flex',flexDirection:'column', width: '100%'}}>
        <Typography variant="h6">Donation</Typography>
        <DonationTable/>
        <div style={{display: 'flex', width: '100%'}}>
            <DonationPie/>
            <DonationChart/>
        </div>
    </Box>)
}
 
export default DonationPortal;