import Notifications from "@mui/icons-material/Notifications";
import { Box, Divider, Icon, List, ListItem, ListItemText, Menu, Popover, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

const NotificationPanel = ({Open}) => {
    const [open,setOpen]= Open;
    const boxRef = useRef(null);
    const notifications = [
        { id: 1, message: 'New donation received!', timestamp: '2 mins ago' },
        { id: 2, message: 'User profile updated.', timestamp: '10 mins ago' },
        { id: 3, message: 'A new request has been submitted.', timestamp: '30 mins ago' },
        { id: 4, message: 'A new request has been submitted.', timestamp: '5 mins ago' },
    ];

    const handleOutsideClick = (e)=>{
        if(boxRef.current && !boxRef.current.contains(e.target)){
            setOpen(!open);
        }
    }

    useEffect(()=>{
        document.addEventListener("mousedown", handleOutsideClick);
        return(()=>{
            document.removeEventListener("mousedown", handleOutsideClick);
        })
    },[])

    return (
            <Box
            ref={boxRef}
            sx={{
                position:'fixed',
                right: '5px',
                top: '55px',
                border: "1px solid rgba(255, 255, 255, 0.3)", 
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)", 
                backgroundColor: 'transparent',
                width: '320px',
                padding: 1,
                borderRadius: '8px'
            }}
            // open={true}
            // anchorEl={anchorEl}
            // transformOrigin={{
            //     vertical: 'top',
            //     horizontal: 'right',
            // }}
            // anchorOrigin={{
            //     vertical: 'top',
            //     horizontal: 'right'
            // }}
            // slotProps={{
            //     paper:{
            //         sx: {
            //             width: '350px', // Adjust the size of the Popover
            //             
            //             border: "1px solid rgba(255, 255, 255, 0.3)", 
            //             boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            //             backdropFilter: "blur(10px)",
            //             WebkitBackdropFilter: "blur(10px)", 
            //             backgroundColor: 'transparent',
            //             marginLeft: '-20px',
            //             zIndex: 1300
            //         }
            //     }}}
            >
                <Box sx={{display: 'flex', alignItems: 'center', padding: '10px'}}>
                    <Notifications sx={{color:'black'}}/>
                    <Typography variant="h6" sx={{ padding: 2, display: 'flex',alignItems: 'center',color: 'black' }}>
                        Notifications
                    </Typography> 
                </Box>
                <Divider />
                <List>
                    {notifications.map((notification) => (
                        <ListItem key={notification.id}>
                            <ListItemText
                                sx={{
                                    fontWeight : 'bold',
                                    color: 'black'
                                }}
                                primary={notification.message}
                                secondary={notification.timestamp}
                            />
                        </ListItem>
                    ))}
                </List>
                {notifications.length === 0 && (
                    <Typography sx={{ padding: 2, textAlign: 'center' }}>
                        No new notifications
                    </Typography>
                )}
            </Box>
    );
};

export default NotificationPanel;
