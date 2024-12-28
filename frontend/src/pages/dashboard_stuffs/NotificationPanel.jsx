import { Divider, List, ListItem, ListItemText, Menu, Typography } from "@mui/material";
import { useState } from "react";

const NotificationPanel = () => {
    const [anchorEl, setAnchorEl] = useState(null); // State to manage dropdown visibility

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget); // Open dropdown
    };

    const handleClose = () => {
        setAnchorEl(null); // Close dropdown
    };

    // Sample notifications
    const notifications = [
        { id: 1, message: 'New donation received!', timestamp: '2 mins ago' },
        { id: 2, message: 'User profile updated.', timestamp: '10 mins ago' },
        { id: 3, message: 'A new request has been submitted.', timestamp: '30 mins ago' },
    ];

    return (
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: '300px', // Set width for the dropdown
                    },
                }}
            >
                <Typography variant="h6" sx={{ padding: 2 }}>
                    Notifications
                </Typography>
                <Divider />
                <List>
                    {notifications.map((notification) => (
                        <ListItem key={notification.id} button onClick={handleClose}>
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
            </Menu>
    );
};

export default NotificationPanel;
