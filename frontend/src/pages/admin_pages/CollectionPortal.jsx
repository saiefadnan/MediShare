import { Box, Typography, styled } from "@mui/material";
import CollectionPie from "../dashboard_stuffs/CollectionPie";
import CollectionChart from "../dashboard_stuffs/CollectionChart";
import CollectionTable from "../dashboard_stuffs/CollectionTable";
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

const  CollectionPortal= () => {
    return ( 
    <Box component="main" sx={{ display: 'flex',flexDirection:'column', width: '100%'}}>
        <DrawerHeader/>
        <Typography variant="h6" sx={{margin: '20px 0 0 20px', fontWeight: 'bold'}}>Collection</Typography>
        <div style={{display: 'flex', flexWrap:'wrap',width: '100%'}}>
            <CollectionPie/>
            <CollectionChart/>
        </div>
        <CollectionTable/>
    </Box>)
}
 
export default CollectionPortal;