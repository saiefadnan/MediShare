import '../../styles/admin.css'
import Box from '@mui/material/Box';
import Cards from '../dashboard_stuffs/Cards';
import Piechart from '../dashboard_stuffs/Piechart';
import Charts from '../dashboard_stuffs/charts';
import Datagrid from '../dashboard_stuffs/Datagrid';
import AdminList from '../dashboard_stuffs/AdminList';
import { Typography } from '@mui/material';


const AdminPortal = () => {
    return ( 
            <Box component="main" sx={{ display: 'flex',flexDirection:'column', width: '100%'}}>
                {/* <DrawerHeader /> */}
                <Typography variant="h6">Admin Portal</Typography>
                <Cards/>
                <div style={{display: 'flex', width: '100%'}}>
                    <Charts/>
                    <Piechart/>
                </div>
                <div style={{display: 'flex', width: '100%'}}>
                    <Datagrid/>
                    <AdminList/>
                </div>
            </Box>
    );
}
 
export default AdminPortal;