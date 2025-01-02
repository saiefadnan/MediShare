import { Box, Typography, styled } from "@mui/material";
import AccountsInfo from "../dashboard_stuffs/AccountsInfo";
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
const AccountsPortal = () => { 
    return ( 
    <Box component="main" sx={{ display: 'flex',flexDirection:'column', width: '100%'}}>
        <DrawerHeader/>
        <Typography variant="h4" sx={{margin: '20px 0 0 20px'}}>Accounts Info.</Typography>
        <AccountsInfo/>
    </Box>);
}
 
export default AccountsPortal;