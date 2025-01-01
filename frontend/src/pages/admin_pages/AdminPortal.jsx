import '../../styles/admin.css'
import Box from '@mui/material/Box';
import Cards from '../dashboard_stuffs/Cards';
import Piechart from '../dashboard_stuffs/Piechart';
import Charts from '../dashboard_stuffs/charts';
import Datagrid from '../dashboard_stuffs/Datagrid';
import AdminList from '../dashboard_stuffs/AdminList';
import { Typography, styled } from '@mui/material';
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

const AdminPortal = () => {
    return ( 
            <Box component="main" sx={{ display: 'flex',flexDirection:'column', width: '100%'}}>
                <DrawerHeader/>
                {/* <DrawerHeader /> */}
                <Typography variant="h4" sx={{margin: '20px 0 0 20px'}}>Admin Portal</Typography>
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