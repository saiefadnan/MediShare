import { Box, Typography } from "@mui/material";
import AccountsInfo from "../dashboard_stuffs/AccountsInfo";

const AccountsPortal = () => { 
    return ( 
    <Box component="main" sx={{ display: 'flex',flexDirection:'column', width: '100%'}}>
        <Typography variant="h6">Accounts Info.</Typography>
        <AccountsInfo/>
    </Box>);
}
 
export default AccountsPortal;