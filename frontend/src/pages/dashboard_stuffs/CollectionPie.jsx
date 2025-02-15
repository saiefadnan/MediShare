import { Box, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useFetch from "../../hooks/useFetch";

const data = [
  { name: 'Donators', value: 4000 },
  { name: 'Collectors', value: 3000 },
  { name: 'Others', value: 2000 },
];

const COLORS = ['#006AFF', '#52C93A', '#FF2727'];

const CollectionPie = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 10},(_,i)=>currentYear-i);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const {data, isPending, error} = useFetch('http://localhost:5000/api/admin/collection-pie',{year: selectedYear});
    const pieData = data
        ? [
            { name: "Collection", value: data.collection },
            { name: "Pending", value: data.pending },
            { name: "Others", value: data.others },
        ]
        : [];
    const handleYear = (e)=>{
    setSelectedYear(e.target.value);
    }
    return ( 
        <Box sx={{ 
            backgroundColor: "#FFE2E5", 
            minWidth: "380px", 
            height: "480px" , 
            margin: '50px auto',
            padding: '20px',
            borderRadius: '8px',
            border: "1px solid rgba(255, 255, 255, 0.3)", 
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}>
        <Typography variant="h6" >Collection Analysis</Typography>
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
            <ResponsiveContainer width="100%" height={310}>
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
                        label
                    >
                        {pieData.map((entry, index) => (
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
 
export default CollectionPie;