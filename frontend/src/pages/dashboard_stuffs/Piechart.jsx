import { Box, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useFetch from "../../hooks/useFetch";

// const data = [
//   { name: 'Pending', value: 4000 },
//   { name: 'Success', value: 3000 },
//   { name: 'Failure', value: 2000 },
// ];

const COLORS = ['#006AFF', '#52C93A', '#FF2727'];

const Piechart = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 10},(_,i)=>currentYear-i);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const {data, isPending, error} = useFetch('http://localhost:5000/api/admin/piechart',{year: selectedYear});
    console.log(data);
    
    const pieData = data
        ? [
            { name: "Pending", value: data.pending },
            { name: "Success", value: data.success },
            { name: "Failure", value: data.failure },
        ]
        : [];
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
            minWidth: "380px", 
            height: "480px" , 
            margin: 'auto',
            padding: '20px',
            borderRadius: '8px',
            '@media (max-width: 400px)':{
                minWidth: "calc(100% - 5px)", 
                padding: '0',
              }}}>
            <Typography variant="h6">PieChart</Typography>
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
            <ResponsiveContainer width="100%" height={310} >
                <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={50}
                        fill="#8884d8"
                        label>
                        {pieData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                <Tooltip />
                <Legend />
                </PieChart>
        </ResponsiveContainer>
  </Box> 
  );
}
 
export default Piechart;