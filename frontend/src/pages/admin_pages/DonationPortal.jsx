import { Box, Typography, styled } from "@mui/material";
import DonationTable from "../dashboard_stuffs/DonationTable";
import DonationChart from "../dashboard_stuffs/Donationchart";
import DonationPie from "../dashboard_stuffs/DonationPie";
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

const  DonationPortal= () => {
    return ( 
    <Box component="main" sx={{ display: 'flex',flexDirection:'column', width: '100%'}}>
        <DrawerHeader/>
        <Typography variant="h6" sx={{margin: '20px 0 0 20px', fontWeight: 'bold'}}>Donation</Typography>
        <DonationTable/>
        <div style={{display: 'flex', width: '100%'}}>
            <DonationPie/>
            <DonationChart/>
        </div>
    </Box>)
}
 
export default DonationPortal;