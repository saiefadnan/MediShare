import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const Datagrid = () => {
  const rows = [
    { id: 1, name: 'Paracetamol', demand: 120, category: 'Pain Reliever' },
    { id: 2, name: 'Amoxicillin', demand: 100, category: 'Antibiotic' },
    { id: 3, name: 'Metformin', demand: 80, category: 'Diabetes' },
    { id: 4, name: 'Ibuprofen', demand: 70, category: 'Pain Reliever' },
    { id: 5, name: 'Cough Syrup', demand: 65, category: 'Cold/Flu' },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Medicine Name', width: 150 },
    { field: 'demand', headerName: 'Demand', type: 'number', width: 120 },
    { field: 'category', headerName: 'Category', width: 200 },
  ];

  return (
    <div style={{ 
        backgroundColor: "#DCEAE3", 
        minWidth: '800px',
        height: "auto" , 
        margin: '20px auto',
        padding: '20px',
        borderRadius: '8px',
        overflowY: 'auto'}}>
        <Box sx={{ height: 400, width: '100%' }}>
        <Typography variant="h6">Top Demanding Medicines</Typography>
        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
        </Box>
    </div>
  );
};

export default Datagrid;
