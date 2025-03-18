import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Box, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { GridAddIcon } from '@mui/x-data-grid';
import SearchUsers from './SearchUsers';
import useFetch from '../../hooks/useFetch';

const AdminList = () => {
  const [open, setOpen] = useState(false);
  const {data, isPending, error} = useFetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/query-admins`);
  const HandleOpen = ()=>{
    console.log('asdsa');
    setOpen(!open);
  }

  return (
    <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2, 
        border: "1px solid rgba(255, 255, 255, 0.3)", 
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)", 
        color: "#333",
        minWidth: '380px',
        height: "500px" , 
        margin: '20px auto',
        padding: '20px',
        borderRadius: '8px',
        
        '@media (max-width: 400px)':{minWidth: "calc(100% - 5px)",}}}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography variant="h6">Other Admins</Typography>
            <IconButton onClick={HandleOpen}>
                <GridAddIcon/>
            </IconButton>
        </Box>
        <Box sx={{overflowY: 'auto'}}>
        {!error && isPending && <Typography>Loading...</Typography>}
        {error && <Typography color="error">Error: {error}</Typography>}
        {data?.map((admin,index) => (
            <Card
            key={index}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 0.3,
                boxShadow: 3,marginBottom: '10px'
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '50px', }}>
                <Avatar src={admin.image_url} alt={admin.name} sx={{ width: 56, height: 56 }} />
                <CardContent sx={{ padding: 1 , textAlign: 'center',  height: '70px'}}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold',
                    '@media (max-width: 200px)':{display: 'none'}}}>
                    {admin.username}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary"
                    sx={{'@media (max-width: 200px)':{display: 'none'}}}>
                        {admin.role}
                    </Typography>
                </CardContent>
            </Box>
            <IconButton >
                <MoreVertIcon />
            </IconButton>
            </Card>
        ))}
        </Box>
        {open && 
            <SearchUsers
            open = {open}
            setOpen = {setOpen}/>}
    </Box>
  );
};

export default AdminList;
