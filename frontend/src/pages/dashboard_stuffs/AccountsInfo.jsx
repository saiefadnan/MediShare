import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const AccountsPortal = () => {
  const rows = [
    { id: 1, name: "user_01", status: "Regular", amount: "$500", edit: "details" },
    { id: 2, name: "user_02", status: "Frequent", amount: "$800", edit: "details" },
    { id: 3, name: "user_03", status: "Limited", amount: "$200", edit: "details" },
    { id: 4, name: "user_01", status: "Regular", amount: "$500", edit: "details" },
    { id: 5, name: "user_02", status: "Frequent", amount: "$800", edit: "details" },
    { id: 6, name: "user_03", status: "Limited", amount: "$200", edit: "details" },
    { id: 7, name: "user_01", status: "Regular", amount: "$500", edit: "details" },
    { id: 8, name: "user_02", status: "Frequent", amount: "$800", edit: "details" },
    { id: 9, name: "user_01", status: "Regular", amount: "$500", edit: "details" },
    { id: 10, name: "user_02", status: "Frequent", amount: "$800", edit: "details" },
    { id: 11, name: "user_03", status: "Limited", amount: "$200", edit: "details" },
    { id: 12, name: "user_01", status: "Regular", amount: "$500", edit: "details" },
    { id: 13, name: "user_02", status: "Frequent", amount: "$800", edit: "details" },
    { id: 14, name: "user_03", status: "Limited", amount: "$200", edit: "details" },
    { id: 15, name: "user_01", status: "Regular", amount: "$500", edit: "details" },
    { id: 16, name: "user_02", status: "Frequent", amount: "$800", edit: "details" },
  ];
  const columns = [
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'status', headerName: 'Status', width: 300 },
    { field: 'amount', headerName: 'Amount', width: 300 },
    { field: 'edit', headerName: 'Edit', width: 300 },
  ];

  return (
    <div style={{ 
        backgroundColor: "#DCEAE3", 
        minWidth: '95%',
        height: "auto" , 
        margin: '10px auto',
        padding: '20px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-around'}}>
        <Box sx={{ height: 700, width: '100%',margin: 'auto',}}>
        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[10]} />
        </Box>
    </div>
  );
};

export default AccountsPortal;
