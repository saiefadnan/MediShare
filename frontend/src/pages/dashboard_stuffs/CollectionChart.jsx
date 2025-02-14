import { Box, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CollectionChart = () => {
  const data = [
    { day: "Monday", Previous: 15000, Present: 14000    },
    { day: "Tuesday", Previous: 20000, Present: 18000   },
    { day: "Wednesday", Previous: 10000, Present: 25000 },
    { day: "Thursday", Previous: 15000, Present: 14000  },
    { day: "Friday", Previous: 12000, Present: 15000    },
    { day: "Saturday", Previous: 18000, Present: 20000  },
    { day: "Sunday", Previous: 20000, Present: 17000    },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 10},(_,i)=>currentYear-i);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const handleYear = (e)=>{
    setSelectedYear(e.target.value);
  }
  return (
    <Box sx={{ 
        backgroundColor: "#FFE2E5", 
        width: '45%',
        minWidth: "490px", 
        height: "480px" , 
        margin: '50px auto',
        padding: '20px',
        borderRadius: '8px',
        border: "1px solid rgba(255, 255, 255, 0.3)", 
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        '@media (max-width: 400px)':{
          minWidth: "calc(100% - 5px)", 
          padding: '0',
        }}}>
      <Typography variant="h6" >Collection Comparison</Typography>
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
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tick={{ fill: "#6c757d" }} />
          <YAxis tick={{ fill: "#6c757d" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Previous" fill="#007bff" name="Previous week" barSize={20} radius={[8,8,0,0]}/>
          <Bar dataKey="Present" fill="#28a745" name="Present week" barSize={20} radius={[8,8,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CollectionChart;
