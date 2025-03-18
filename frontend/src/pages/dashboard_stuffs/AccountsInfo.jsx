import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Box, Button, LinearProgress, Typography} from '@mui/material';
import check from './Icons/check.png'
import error1 from './Icons/error.png'
import ModalDiv from './ModalDiv';
import useFetch from '../../hooks/useFetch';

const AccountsPortal = () => {
  const [info, setInfo]= useState({});
  const [open, setOpen]= useState(false);
  const [name, setName]= useState(null);
  const [image, setImage]= useState(null);
  const [status, setStatus] = useState(null);
  const [id, setId]= useState(0);
  const {data, isPending, error} = useFetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/user-data`);
  useEffect(()=>{
    setInfo(data);
  },[data])
  const HandleOpen = (id, status, name, image)=>{
    setOpen(!open);
    setId(id);
    setStatus(status);
    setName(name);
    setImage(image);
  }

  const updateUserStatus = (userId, newStatus) => {
    setInfo(prevData =>
      prevData.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };
  
  const columns = [
    { field: 'image_url', headerName: 'Avatar', width: 200,
    renderCell:(params)=>(
      <Box sx={{
        width: '100%', 
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '10px'}}>
        <Avatar src={params.value}/>
      </Box>
    )},
    { field: 'username', headerName: 'Account Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'status', headerName: 'Status', width: 80,
      renderCell: (params)=>(
        <Box sx={{
          width: '100%', 
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '10px'}}>
          {params.value==='active'?
          <Avatar src={check}
            sx={{ height: 30, width: 30 , border: '1px solid #F4F7FE' }} />
          :<Avatar src={error1}
            sx={{ height: 30, width: 30 , border: '1px solid #F4F7FE' }}  
          />}
        </Box>
      ) },
    { field: 'donation_contribution', headerName: 'Donation Contribution', width: 250,type: 'number',
    renderCell: (params)=>(
      <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <LinearProgress value={params.value}
        variant="determinate"
        sx={{
          width: '80%', 
          margin: 'auto',
          borderRadius: '8px',
          backgroundColor: '#EFF4FB',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#2fac6e',
          },
        }}>
        </LinearProgress>
      </Box>
    )},
    { field: 'collection_contribution', headerName: 'Collection Contribution', width: 250,type: 'number',
    renderCell: (params)=>(
      <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <LinearProgress value={params.value}
        variant="determinate"
        sx={{
          width: '80%', 
          margin: 'auto',
          borderRadius: '8px',
          backgroundColor: '#EFF4FB',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'crimson',
          },
        }}>
        </LinearProgress>
      </Box>
    )},
    { field: 'id', headerName: 'Edit', width: 300 ,
    renderCell: (params)=>(
      <Box>
        <Button 
        onClick={()=>HandleOpen(params.value, params.row.status, params.row.username,params.row.image_url)}
        variant='contained'
        size='small'
        sx={{
          backgroundColor: '#DBC391'
        }}>
          Manage
        </Button>
      </Box>
    )},
  ];

  return (
        <Box sx={{ height: 750, width: '100%',}}>
          {!error && isPending && <Typography>Loading...</Typography>}
          {error && <Typography color="error">Error: {error}</Typography>}
          <DataGrid 
            rows={info} 
            columns={columns} 
            pageSize={5} 
            rowsPerPageOptions={[10]} 
            sx={{
              height:'95%',
              width: '46.2%',
              minWidth: '500px',
              margin: '25px auto',
              backgroundColor: "#FEF4DF", 
              border: "1px solid rgba(255, 255, 255, 0.3)", 
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              '.MuiDataGrid-columnHeaders': {
                backgroundColor: '#DBC391', 
                padding: '10px',
                color: 'black',
              },
          }}/>
          {open && 
          <ModalDiv
            Open={[open, setOpen]}
            Id={[id, setId]}
            Status={[status, setStatus]}
            Name={[name, setName]}
            Image={[image, setImage]}
            updateUserStatus={updateUserStatus}
          />}
        </Box>
  );
};

export default AccountsPortal;
