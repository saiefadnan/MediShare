import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, InputLabel, LinearProgress, MenuItem, Select, Typography } from '@mui/material';
import useFetch from '../../hooks/useFetch';

const Datagrid = () => {
  const currentYear = new Date().getFullYear();
  const currentLimit = 10;
  const years = Array.from({length: 10},(_,i)=>currentYear-i);
  const limits = Array.from({length: 10},(_,i)=>10*(i+1));
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedLimit, setSelectedLimit] = useState(currentLimit);
  const handleYear = (e)=>{
    setSelectedYear(e.target.value);
  }
  const handleLimit = (e)=>{
    setSelectedLimit(e.target.value);
  }
  const {data, isPending, error} = useFetch('http://localhost:5000/api/admin/datagrid',{year: selectedYear, limit: selectedLimit});
  console.log(data);
  // const progressColor = ['#0095FF','#00E096','#884DFF','#FF8F0D','#979797'];
  // const barColor = ['#CDE7FF','#8CFAC7','#C5A8FF','#FFD5A4','#F4F7FE'];
  const generateColors = (num, param) => {
    const colors = [];
    const hueStep = 360 / num; 
    for (let i = 0; i < num; i++) {
      const hue = i * hueStep;
      const color = `hsl(${hue}, 50%, ${param}%)`;
      colors.push(color);
    }
  
    return colors;
  };
  
  // Generate 100 colors for both arrays
  const progressColor = generateColors(selectedLimit,40);
  const barColor = generateColors(selectedLimit,80);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'generic_name', headerName: 'Name', width: 120},
    { field: 'donation', headerName: 'Donation', type: 'number', width: 120,

    renderCell: (params)=>(
      <Box sx={{ width: "100%" }}>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            {`${params.value}%`}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={params.value}
            sx={{ height: 5, borderRadius: 5,
              backgroundColor: barColor[params.id-1],
              '& .MuiLinearProgress-bar': {
                backgroundColor: progressColor[params.id-1], // Custom bar color
              },
              }}/>
        </Box>
    )},
    { 
      field: 'collection', 
      headerName: 'Collection', 
      type: 'number', 
      width: 120,
      renderCell: (params)=>(
        <Box sx={{ width: "100%" }}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              {`${params.value}%`}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={params.value}
              sx={{ height: 5, borderRadius: 5,
                backgroundColor: barColor[params.id-1],
                '& .MuiLinearProgress-bar': {
                  backgroundColor: progressColor[params.id-1], // Custom bar color
                },
                }}/>
          </Box>
      )},
      { 
        field: 'pending', 
        headerName: 'Pending Count', 
        type: 'number', 
        width: 120,

      renderCell:(params)=>(
        <Box sx={{
          width: '80px',
          margin: '15px auto',
          border: `1px solid ${progressColor[params.id-1]}`,
          borderRadius: '8px',
          backgroundColor: barColor[params.id-1],
          textAlign: 'center'
        }}>
          <Typography variant="body2" >
                {`${params.value}`}
              </Typography>
        </Box>
    )}
  ];

  return (
      <Box sx={{ 
        border: "1px solid rgba(255, 255, 255, 0.3)", 
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)", 
        color: "#333",
        width: '45%',
        minWidth: '380px',
        height: "400px" , 
        margin: '20px auto',
        padding: '20px 10px',
        borderRadius: '8px',
        '@media (max-width: 400px)':{
          minWidth: "calc(100% - 5px)", 
        }}}>
          <Typography variant="h6" >Top Requested Medicines On Pending</Typography>
          {!error && isPending && <Typography>Loading...</Typography>}
          {error && <Typography color="error">Error: {error}</Typography>}
          <Box sx={{display: "flex",alignItems: "center", gap: 2}}>
            <InputLabel>Year </InputLabel>
            <Select
              sx={{height: '40px'}}
              value={selectedYear}
              onChange={handleYear}
              label="Year">
              {years.map((year)=>(
                  <MenuItem key={year} value={year}>
                  {year}
                  </MenuItem>
              ))}
            </Select>
              <InputLabel>Limit </InputLabel>
              <Select
                sx={{height: '40px'}}
                value={selectedLimit}
                onChange={handleLimit}
                label="Limit">
                {limits.map((limit)=>(
                    <MenuItem key={limit} value={limit}>
                    {limit}
                    </MenuItem>
                ))}
              </Select>
            </Box>
          <DataGrid rows={data} columns={columns} pageSize={5} rowsPerPageOptions={[5]} sx={{height: '90%',width: '100%',
          minWidth: '300px',
        '@media (max-width: 400px)':{
          minWidth: "100%", 
          padding: '0',
        }}}/>
        </Box>
    
  );
};

export default Datagrid;
