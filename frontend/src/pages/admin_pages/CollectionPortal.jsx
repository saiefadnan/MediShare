import { Box, CssBaseline, Typography } from "@mui/material";
import CollectionPie from "../dashboard_stuffs/CollectionPie";
import CollectionChart from "../dashboard_stuffs/CollectionChart";
import CollectionTable from "../dashboard_stuffs/CollectionTable";


const  CollectionPortal= () => {
    return ( 
    <Box component="main" sx={{ display: 'flex',flexDirection:'column', width: '100%'}}>
        <Typography variant="h6">Collection</Typography>
        <CollectionTable/>
        <div style={{display: 'flex', width: '100%'}}>
            <CollectionPie/>
            <CollectionChart/>
        </div>
    </Box>)
}
 
export default CollectionPortal;