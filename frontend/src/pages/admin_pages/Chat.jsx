import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../dashboard_stuffs/Sidebar";

const Chat = () => {
    return ( 
    <div className="page91">
        <Box sx={{ display: 'flex', height: '100%'}}>
            <CssBaseline />
            <Sidebar/>
            Chat
        </Box>
    </div> 
    );
}
 
export default Chat;