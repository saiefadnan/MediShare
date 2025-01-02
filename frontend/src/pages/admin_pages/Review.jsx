import { Box, styled, Typography } from "@mui/material";
import ReviewCards from "../dashboard_stuffs/ReviewCards";
import ReviewChart from "../dashboard_stuffs/ReviewChart";
import CollectionChart from "../dashboard_stuffs/CollectionChart";

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
        <Typography variant="h4" sx={{margin: '20px 0 0 20px'}}>Users' Review</Typography>
        
        <ReviewCards/>
        <div style={{display: 'flex', width: '100%'}}>
             <ReviewChart/>
             <CollectionChart/>
        </div>
       
    </Box>);
}
 
export default Review;