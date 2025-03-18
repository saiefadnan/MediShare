import { Box, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useFetch from "../../hooks/useFetch";

const COLORS = ['#006AFF', '#52C93A', '#FF2727'];

const DonationPie = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 10},(_,i)=>currentYear-i);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const {data, isPending, error} = useFetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/donation-pie`,{year: selectedYear});
    const pieData = data
        ? [
            { name: "Donation", value: data.donation },
            { name: "Expired", value: data.expired },
            { name: "Others", value: data.others },
        ]
        : [];
    // console.log(data);
    const handleYear = (e)=>{
    setSelectedYear(e.target.value);
    }
    return ( 
        <Box sx={{ 
            backgroundColor: "#DCEAE3", 
            minWidth: "380px", 
            height: "480px" , 
            margin: '50px auto',
            padding: '20px',
            borderRadius: '8px',
            border: "1px solid rgba(255, 255, 255, 0.3)", 
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}>
        <Typography variant="h6" >Donation Analytics</Typography>
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
            {!error && isPending && <Typography>Loading...</Typography>}
            {error && <Typography color="error">Error: {error}</Typography>}
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
 
export default DonationPie;