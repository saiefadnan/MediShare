import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, LinearProgress, Typography } from '@mui/material';

const Datagrid = () => {
  const rows = [
    { id: 1, name: 'Paracetamol', donation: 15, collection: 10 },
    { id: 2, name: 'Amoxicillin', donation: 100, collection: 20 },
    { id: 3, name: 'Metformin', donation: 80, collection: 45 },
    { id: 4, name: 'Ibuprofen', donation: 70, collection: 30 },
    { id: 5, name: 'Cough Syrup', donation: 65, collection: 42 },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Medicine Name', width: 150},
    { field: 'donation', headerName: 'Donation', type: 'number', width: 300 ,
    renderCell: (params)=>(
      <Box sx={{ width: "100%" }}>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            {`${params.value}%`}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={params.value}
            sx={{ height: 5, borderRadius: 5 }}/>
        </Box>
    )},
    { field: 'collection', headerName: 'Collection', type: 'number', width: 150,
  renderCell:(params)=>(
    <Box sx={{
      width: '80px',
      margin: '15px auto',
      border: '1px solid #0095FF',
      borderRadius: '8px',
      backgroundColor: '#F0F9FF',
      textAlign: 'center'
    }}>
      <Typography variant="body2" >
            {`${params.value}%`}
          </Typography>
    </Box>
  )},
  ];

  return (
    <div style={{ 
        backgroundColor: "#DCEAE3", 
        minWidth: '800px',
        height: "auto" , 
        margin: '20px auto',
        padding: '20px',
        borderRadius: '8px'}}>
        <Box sx={{ height: 400, width: '100%',margin: 'auto',padding: 2}}>
        <Typography variant="h6">Top Demanding Medicines</Typography>
        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
        </Box>
    </div>
  );
};

export default Datagrid;
