import { Box, styled, Typography } from "@mui/material";
import ReviewCards from "../dashboard_stuffs/ReviewCards";
import ReviewBreakdown from "../dashboard_stuffs/ReviewBreakdown";
import ReviewChart from "../dashboard_stuffs/ReviewChart";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

const Review = () => {
    
    return ( 
    <Box component="main" sx={{ display: 'flex',flexDirection:'column', width: '100%'}}>
    <DrawerHeader/>
        <Typography variant="h6" sx={{margin: '20px 0 0 20px', fontWeight: 'bold'}}>Users' Review</Typography>
        <ReviewCards/>
        <Box sx={{
            display: 'flex', 
            flexWrap:'wrap', 
            width: '100%'}}>
             <ReviewBreakdown />
             <ReviewChart/>
        </Box>
       
    </Box>);
}
 
export default Review;