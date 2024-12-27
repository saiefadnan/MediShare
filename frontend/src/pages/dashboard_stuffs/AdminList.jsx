import React from 'react';
import { Card, CardContent, Typography, IconButton, Box, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const AdminList = () => {
  const admins = [
    { id: 1, name: 'Sam Alt', role: 'Super Admin', avatar: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Jane Doe', role: 'Admin', avatar: 'https://via.placeholder.com/50' },
    { id: 3, name: 'John Smith', role: 'Moderator', avatar: 'https://via.placeholder.com/50' },
  ];

  return (
    <div style={{ 
        backgroundColor: "#DCEAE3", 
        minWidth: '400px',
        height: "auto" , 
        margin: '20px auto',
        padding: '30px',
        borderRadius: '8px'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500, margin: '0 auto' }}>
        <Typography variant="h6">Other Admins</Typography>
        {admins.map((admin) => (
            <Card
            key={admin.id}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 1,
                boxShadow: 3,
            }}
            >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar src={admin.avatar} alt={admin.name} sx={{ width: 56, height: 56 }} />
                <CardContent sx={{ padding: 0 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {admin.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {admin.role}
                </Typography>
                </CardContent>
            </Box>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
            </Card>
        ))}
        </Box>
    </div>
  );
};

export default AdminList;
