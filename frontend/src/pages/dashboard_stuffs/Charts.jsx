import { Box, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'JAN', donators: 4000, collectors: 2400 },
  { name: 'FEB', donators: 3000, collectors: 1398 },
  { name: 'MAR', donators: 2000, collectors: 9800 },
  { name: 'APR', donators: 2780, collectors: 3908 },
  { name: 'MAY', donators: 1890, collectors: 4800 },
  { name: 'JUNE', donators: 2390, collectors: 3800 },
  { name: 'JUL', donators: 3490, collectors: 4300 },
  { name: 'AUG', donators: 4000, collectors: 2400 },
  { name: 'SEP', donators: 3000, collectors: 1398 },
  { name: 'OCT', donators: 2000, collectors: 9800 },
  { name: 'NOV', donators: 2780, collectors: 3908 },
  { name: 'DEC', donators: 1890, collectors: 4800 },
];

const Charts = () => {

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 10},(_,i)=>currentYear-i);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const handleYear = (e)=>{
    setSelectedYear(e.target.value);
  }
    return (  
      <Box sx={{ 
        border: "1px solid rgba(255, 255, 255, 0.3)", 
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)", 
        color: "#333",
        width: '45%',
        minWidth: "380px", 
        height: "480px" , 
        margin: '20px auto',
        padding: '20px',
        borderRadius: '8px',
        '@media (max-width: 400px)':{
          minWidth: "calc(100% - 5px)", 
          padding: '0',
        }}}>
        <Typography variant="h6">Donators Vs Collectors</Typography>
        <Box sx={{display: "flex",alignItems: "center", gap: 2}}>
          <InputLabel>Year </InputLabel>
          <Select
          sx={{height: '45px'}}
          value={selectedYear}
          onChange={handleYear}
          label="Year">
            {years.map((year)=>(
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <ResponsiveContainer width="100%" height={300} style={{margin: '50px auto'}}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="donators" stroke="#ff7300" />
          <Line type="monotone" dataKey="collectors" stroke="#387908" />
        </LineChart>
      </ResponsiveContainer> 
    </Box>  );
}
 
export default Charts;