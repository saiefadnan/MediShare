import Notifications from "@mui/icons-material/Notifications";
import { Avatar, Box, Divider, Icon, List, ListItem, ListItemText, Menu, Popover, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { formatDistanceToNow } from 'date-fns';
import useFetch from "../../hooks/useFetch";
import user from '../../../public/Icons/user.png';
import alert from '../../../public/Icons/alert.png';
import donation from '../../../public/Icons/donation.png'
const NotificationPanel = ({Params}) => {
    const {data, isPending, error} = useFetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/fetch-notifs`);
    console.log(data);
    const [open,setOpen,setNotifyCount]= Params;
    const boxRef = useRef(null);
    const handleOutsideClick = (e)=>{
        if(boxRef.current && !boxRef.current.contains(e.target)){
            setOpen(!open);
            setNotifyCount(0);
        }
    }

    const formatTimestamp= (ts)=>{
        return formatDistanceToNow(new Date(ts),{addSuffix: true});
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
                right: '2%',
                top: '55px',
                border: "1px solid rgba(255, 255, 255, 0.3)", 
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)", 
                backgroundColor: 'transparent',
                width: '320px',
                padding: 1,
                borderRadius: '8px',
            }}
            >
                <Box sx={{display: 'flex', alignItems: 'center', padding: '10px'}}>
                    <Notifications sx={{color:'black'}}/>
                    <Typography variant="h6" sx={{ padding: 2, display: 'flex',alignItems: 'center',color: 'black' }}>
                        Notifications
                    </Typography> 
                </Box>
                <Divider />
                {!error && isPending && <Typography>Loading...</Typography>}
                {error && <Typography color="error">Error: {error}</Typography>}
                <List sx={{height: '600px',overflowY: 'auto'}}>
                    {data?.map((notification) => (
                        <ListItem key={notification.id}>
                            <Avatar src={notification.category==="user"?user:notification.category==="donation"?donation:alert} sx={{padding: 0.5}}/>
                            <ListItemText
                                sx={{
                                    fontWeight : 'bold',
                                    color: 'black'
                                }}
                                primary={notification.message}
                                secondary={formatTimestamp(notification.created_at)}
                            />
                        </ListItem>
                    ))}
                </List>
                {data?.length === 0 && (
                    <Typography sx={{ padding: 2, textAlign: 'center' }}>
                        No new notifications
                    </Typography>
                )}
            </Box>
    );
};

export default NotificationPanel;
