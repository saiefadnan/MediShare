import { Box, styled, Typography } from "@mui/material";
import ReviewCards from "../dashboard_stuffs/ReviewCards";
import ReviewBreakdown from "../dashboard_stuffs/ReviewBreakdown";
import ReviewChart from "../dashboard_stuffs/ReviewChart";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
const Review = () => {
    return ( 
    <Box component="main" sx={{ display: 'flex',flexDirection:'column', width: '100%'}}>
    <DrawerHeader/>
        <Typography variant="h6" sx={{margin: '20px 0 0 20px', fontWeight: 'bold'}}>Users' Review</Typography>
        <ReviewCards/>
        <div style={{
            display: 'flex', 
            width: '100%'}}>
             <ReviewBreakdown/>
             <ReviewChart/>
        </div>
       
    </Box>);
}
 
export default Review;