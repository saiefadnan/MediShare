import { Box, styled } from "@mui/material";

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
        Rvi
    </Box>);
}
 
export default Review;