import { Box } from '@mui/material';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'JAN', donators: 4000, collectors: 2400 },
  { name: 'FEB', donators: 3000, collectors: 1398 },
  { name: 'MAR', donators: 2000, collectors: 9800 },
  { name: 'APR', donators: 2780, collectors: 3908 },
  { name: 'MAY', donators: 1890, collectors: 4800 },
  { name: 'JUNE', donators: 2390, collectors: 3800 },
  { name: 'JUL', donators: 3490, collectors: 4300 },
];

const Charts = () => {
    return (  
      <Box sx={{ 
        border: "1px solid rgba(255, 255, 255, 0.3)", 
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)", 
        color: "#333",
        width: '45%',
        minWidth: "490px", 
        height: "400px" , 
        margin: '20px auto',
        padding: '20px',
        borderRadius: '8px'}}>
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