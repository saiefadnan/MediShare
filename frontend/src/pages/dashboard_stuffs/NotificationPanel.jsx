import Notifications from "@mui/icons-material/Notifications";
import { Divider, Icon, List, ListItem, ListItemText, Menu, Popover, Typography } from "@mui/material";
import { useState } from "react";

const NotificationPanel = () => {

    const notifications = [
        { id: 1, message: 'New donation received!', timestamp: '2 mins ago' },
        { id: 2, message: 'User profile updated.', timestamp: '10 mins ago' },
        { id: 3, message: 'A new request has been submitted.', timestamp: '30 mins ago' },
        { id: 4, message: 'A new request has been submitted.', timestamp: '5 mins ago' },
    ];

    return (
            <Popover 
            open={true}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            PaperProps={{
                sx: {
                    width: '350px', // Adjust the size of the Popover
                    padding: 2,
                    border: "1px solid rgba(255, 255, 255, 0.3)", 
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)", 
                    backgroundColor: 'transparent',
                    marginLeft: '-85px'
                }
                }}>
                <Typography variant="h6" sx={{ padding: 2 }}>
                    <Icon>
                        <Notifications/>
                    </Icon>
                    Notifications
                </Typography>
                <Divider />
                <List>
                    {notifications.map((notification) => (
                        <ListItem key={notification.id}>
                            <ListItemText
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
            </Popover>
    );
};

export default NotificationPanel;
