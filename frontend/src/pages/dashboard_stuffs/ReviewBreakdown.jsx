import { Box, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
{ rating: "5",  count: 20000    },
{ rating: "4",  count: 8000   }, 
{ rating: "3", count: 5000,   },
{ rating: "2",count: 2000,    }, 
{ rating: "1", count: 10000,  },
];


const ReviewBreakdown = () =>{
    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 10},(_,i)=>currentYear-i);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const handleYear = (e)=>{
    setSelectedYear(e.target.value);
    }
    return(
    <Box style={{ 
        width: '45%',
        maxWidth: "560px", 
        minWidth: "380px", 
        height: "480px",
        borderRadius: '8px',
        padding: '20px',
        border: "1px solid rgba(255, 255, 255, 0.3)", 
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)", 
        color: "#333",
        margin: '20px auto',
        '@media (max-width: 400px)':{
            minWidth: "calc(100% - 5px)", 
            padding: '0',
          }}}>
        <Typography variant="h6" >Review Breakdown</Typography>
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
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                layout="vertical"
                width={600}
                height={400}
                data={data}
                margin={{
                top: 20,
                right: 30,
                bottom: 5,}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis  type="number"/>
                <YAxis dataKey="rating" type="category"/>
                <Tooltip />
                <Bar dataKey="count" fill="#E1F537" barSize={20} radius={[0,8,8,0]}/>
            </BarChart>
        </ResponsiveContainer>
    </Box>
)};

export default ReviewBreakdown;
