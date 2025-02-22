import { Box, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useFetch from "../../hooks/useFetch";

const DonationChart = () => {
  // const currentYear = new Date().getFullYear();
  // const years = Array.from({length: 10},(_,i)=>currentYear-i);
  // const [selectedYear, setSelectedYear] = useState(currentYear);
  const {data, isPending, error} = useFetch('http://localhost:5000/api/admin/comparison-data');
  // const handleYear = (e)=>{
  //   setSelectedYear(e.target.value);
  // }
  return (
      <Box sx={{ 
            backgroundColor: "#DCEAE3", 
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
        <Typography variant="h6" >Weekly Comparison</Typography>
        {/* <Box sx={{display: "flex",alignItems: "center", gap: 2}}>
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
        </Box> */}
        {!error && isPending && <Typography>Loading...</Typography>}
        {error && <Typography color="error">Error: {error}</Typography>}
        <ResponsiveContainer width="100%" height={300} style={{margin: '50px auto'}}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tick={{ fill: "#6c757d" }} />
          <YAxis tick={{ fill: "#6c757d" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="donation" fill="#007bff" name="Donation" barSize={20} radius={[8,8,0,0]}/>
          <Bar dataKey="collection" fill="#28a745" name="Collection" barSize={20} radius={[8,8,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DonationChart;
