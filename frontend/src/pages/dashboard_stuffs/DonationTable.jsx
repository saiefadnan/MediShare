import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Box, Button, LinearProgress} from '@mui/material';
import check from '../../../public/Icons/check.png'
import error from '../../../public/Icons/error.png'
import { useState } from 'react';
import ModalDiv from './ModalDiv';

const DonationTable = () => {
  const [open, setOpen]= useState(false);

  const HandleOpen = ()=>{
    setOpen(!open);
  }

  const rows = [
    { id: 1, name: "user_01", status: "Regular", contribution: 49, edit: "details" },
    { id: 2, name: "user_02", status: "Frequent", contribution: 98, edit: "details" },
    { id: 3, name: "user_03", status: "Limited", contribution: 7, edit: "details" },
    { id: 4, name: "user_01", status: "Regular", contribution: 96, edit: "details" },
    { id: 5, name: "user_02", status: "Frequent", contribution: 95, edit: "details" },
    { id: 6, name: "user_03", status: "Limited", contribution: 94, edit: "details" },
    { id: 7, name: "user_01", status: "Regular", contribution: 9, edit: "details" },
    { id: 8, name: "user_02", status: "Frequent", contribution: 92, edit: "details" },
    { id: 9, name: "user_01", status: "Regular", contribution: 91, edit: "details" },
    { id: 10, name: "user_02", status: "Frequent", contribution: 90, edit: "details" },
    { id: 11, name: "user_03", status: "Limited", contribution: 89, edit: "details" },
    { id: 12, name: "user_01", status: "Regular", contribution: 88, edit: "details" },
    { id: 13, name: "user_02", status: "Frequent", contribution: 87, edit: "details" },
    { id: 14, name: "user_03", status: "Limited", contribution: 86, edit: "details" },
    { id: 15, name: "user_01", status: "Regular", contribution: 85, edit: "details" },
    { id: 16, name: "user_02", status: "Frequent", contribution: 8, edit: "details" },
    { id: 1, name: "user_01", status: "Regular", contribution: 49, edit: "details" },
    { id: 2, name: "user_02", status: "Frequent", contribution: 98, edit: "details" },
    { id: 3, name: "user_03", status: "Limited", contribution: 7, edit: "details" },
    { id: 4, name: "user_01", status: "Regular", contribution: 96, edit: "details" },
    { id: 5, name: "user_02", status: "Frequent", contribution: 95, edit: "details" },
    { id: 6, name: "user_03", status: "Limited", contribution: 94, edit: "details" },
    { id: 7, name: "user_01", status: "Regular", contribution: 9, edit: "details" },
    { id: 8, name: "user_02", status: "Frequent", contribution: 92, edit: "details" },
    { id: 9, name: "user_01", status: "Regular", contribution: 91, edit: "details" },
    { id: 10, name: "user_02", status: "Frequent", contribution: 90, edit: "details" },
    { id: 11, name: "user_03", status: "Limited", contribution: 89, edit: "details" },
    { id: 12, name: "user_01", status: "Regular", contribution: 88, edit: "details" },
    { id: 13, name: "user_02", status: "Frequent", contribution: 87, edit: "details" },
    { id: 14, name: "user_03", status: "Limited", contribution: 86, edit: "details" },
    { id: 15, name: "user_01", status: "Regular", contribution: 85, edit: "details" },
    { id: 16, name: "user_02", status: "Frequent", contribution: 8, edit: "details" },
  ];
  
  const columns = [
    { field: 'name', headerName: 'Top Donators', width: 25 },
    { field: 'status', headerName: 'Status', width: 80,
      renderCell: (params)=>(
        <Box sx={{
          width: '100%', 
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '10px'}}>
          {params.value==='Regular'?
          <Avatar src={check}
            sx={{ height: 30, width: 30 , border: '1px solid #F4F7FE' }} />
          :<Avatar src={error}
            sx={{ height: 30, width: 30 , border: '1px solid #F4F7FE' }}  
          />}
        </Box>
      ) },
    { field: 'contribution', headerName: 'Contribution', width: 250,type: 'number',
    renderCell: (params)=>(
      <Box
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
        <LinearProgress value={params.value}
        variant="determinate"
        sx={{
          width: '80%', 
          margin: 'auto',
          borderRadius: '8px',
          backgroundColor: '#EFF4FB',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#60C67F',
          },
        }}>
        </LinearProgress>
      </Box>
    )},
    { field: 'edit', headerName: 'Edit', width: 300 ,
    renderCell: (params)=>(
      <Box>
        <Button 
        onClick={HandleOpen}
        variant='contained'
        size='small'
        sx={{
          backgroundColor: '#60C67F'
        }}>
          Manage
        </Button>
      </Box>
    )},
  ];

  return (
        <Box sx={{ height: '750px',width: '100%', margin: '50px auto'}}>
          <DataGrid 
            rows={rows} 
            columns={columns} 
            pageSize={5} 
            rowsPerPageOptions={[10]} 
            sx={{
              height:'95%',
              width: '46.2%',
              minWidth: '500px',
              margin: '20px auto',
              backgroundColor: "#DCEAE3", 
              border: "1px solid rgba(255, 255, 255, 0.3)", 
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              '.MuiDataGrid-columnHeaders': {
                backgroundColor: '#60C67F', 
                padding: '10px',
                color: 'black',
                
              },
          }}/>
          {open && 
          <ModalDiv
            open = {open}
            setOpen = {setOpen}
          />}
        </Box>
  );
};

export default DonationTable;
