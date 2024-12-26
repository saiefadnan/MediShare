import '../styles/admin.css'
import Sidebar from './dashboard_stuffs/Sidebar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Cards from './dashboard_stuffs/Cards';
import Piechart from './dashboard_stuffs/Piechart';
import Charts from './dashboard_stuffs/charts';


const Admin = () => {
    return ( 
    <div className="page91">
        <Box sx={{ display: 'flex', height: '100%'}}>
                <CssBaseline />
                <Sidebar/>
            <Box component="main" sx={{ display: 'flex',flexDirection:'column', width: '100%'}}>
                {/* <DrawerHeader /> */}
                <Cards/>
                <div style={{display: 'flex', width: '100%'}}>
                    <Charts/>
                    <Piechart/>
                </div>
            </Box>
        </Box>
    </div> 
    );
}
 
export default Admin;