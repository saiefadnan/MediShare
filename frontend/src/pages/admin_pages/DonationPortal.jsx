import { Box, Typography, styled } from "@mui/material";
import DonationChart from "../dashboard_stuffs/DonationChart";
import DonationPie from "../dashboard_stuffs/DonationPie";
import CollectionPie from "../dashboard_stuffs/CollectionPie";

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
        <Typography variant="h6" sx={{margin: '20px 0 0 20px', fontWeight: 'bold'}}>Analytics</Typography>
        <div style={{display: 'flex',flexWrap:'wrap', width: '100%'}}>
            <DonationPie/>
            <CollectionPie/>
            <DonationChart/>
        </div> 
        {/* <Typography variant="h6" sx={{margin: '20px 0 0 20px', fontWeight: 'bold'}}>Collection Analysis</Typography>
        <div style={{display: 'flex', flexWrap:'wrap',width: '100%'}}>
            
            <CollectionChart/>
        </div>
        <DonationTable/> */}
    </Box>)
}
 
export default DonationPortal;