import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, LinearProgress, Typography } from '@mui/material';

const Datagrid = () => {
  const rows = [
    { id: 1, name: 'Paracetamol', donation: [15,0] ,collection: [10,0] },
    { id: 2, name: 'Amoxicillin', donation: [100,1], collection: [20,1] },
    { id: 3, name: 'Metformin', donation: [80,2], collection: [45,2] },
    { id: 4, name: 'Ibuprofen', donation: [70,3], collection: [30,3] },
    { id: 5, name: 'Cough Syrup', donation: [65,4], collection: [42,4] },
  ];

  const progressColor = ['#0095FF','#00E096','#884DFF','#FF8F0D','#979797'];
  const barColor = ['#CDE7FF','#8CFAC7','#C5A8FF','#FFD5A4','#F4F7FE'];


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Medicine Name', width: 150},
    { field: 'donation', headerName: 'Donation', type: 'number', width: 300 ,
    renderCell: (params)=>(
      <Box sx={{ width: "100%" }}>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            {`${params.value[0]}%`}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={params.value[0]}
            sx={{ height: 5, borderRadius: 5,
              backgroundColor: barColor[params.value[1]],
              '& .MuiLinearProgress-bar': {
                backgroundColor: progressColor[params.value[1]], // Custom bar color
              },
              }}/>
        </Box>
    )},
    { 
      field: 'collection', 
      headerName: 'Collection', 
      type: 'number', 
      width: 150,
      renderCell:(params)=>(
        <Box sx={{
          width: '80px',
          margin: '15px auto',
          border: `1px solid ${progressColor[params.value[1]]}`,
          borderRadius: '8px',
          backgroundColor: barColor[params.value[1]],
          textAlign: 'center'
        }}>
          <Typography variant="body2" >
                {`${params.value[0]}%`}
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
