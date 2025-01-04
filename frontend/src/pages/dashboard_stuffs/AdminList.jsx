import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Box, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import avatar1 from '../dashboard_stuffs/Icons/avatar1.png'
import avatar2 from '../dashboard_stuffs/Icons/avatar2.png'
import avatar3 from '../dashboard_stuffs/Icons/avatar3.png'
import { GridAddIcon } from '@mui/x-data-grid';
import SearchUsers from './SearchUsers';
import { Button } from 'react-bootstrap';

const AdminList = () => {
  const admins = [
    { id: 1, name: 'Sam Alt', role: 'Admin', avatar: avatar1 },
    { id: 2, name: 'Jane Doe', role: 'Admin', avatar: avatar2 },
    { id: 3, name: 'John Smith', role: 'Moderator', avatar: avatar3 },
  ];

  const [open, setOpen] = useState(false);
  const HandleOpen = ()=>{
    console.log('asdsa');
    setOpen(!open);
  }

  return (
    <div style={{ 
        backgroundColor: "#DCEAE3", 
        minWidth: '400px',
        height: "auto" , 
        margin: '20px auto',
        padding: '30px',
        borderRadius: '8px'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500, margin: '0 auto' }}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography variant="h6">Other Admins</Typography>
            <IconButton onClick={HandleOpen}>
                <GridAddIcon/>
            </IconButton>
        </Box>
        
        {admins.map((admin) => (
            <Card
            key={admin.id}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 0.5,
                boxShadow: 3,
            }}
            >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar src={admin.avatar} alt={admin.name} sx={{ width: 56, height: 56 }} />
                <CardContent sx={{ padding: 1 , textAlign: 'center',  height: '70px'}}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold'}}>
                        {admin.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {admin.role}
                    </Typography>
                </CardContent>
            </Box>
            <IconButton >
                <MoreVertIcon />
            </IconButton>
            </Card>
        ))}
        {open && 
            <SearchUsers
            open = {open}
            setOpen = {setOpen}/>}
        </Box>
    </div>
  );
};

export default AdminList;
