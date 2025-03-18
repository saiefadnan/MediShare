import { Box, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useFetch from "../../hooks/useFetch";

const ReviewChart = () => {

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 10},(_,i)=>currentYear-i);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const {data, isPending, error} = useFetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/rating-chart`,{year: selectedYear});

    const handleYear = (e)=>{
        setSelectedYear(e.target.value);
    }

  return (
    <Box sx={{ 
        width: '45%',
        minWidth: '380px', 
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
      <Typography variant="h6" >Review by year</Typography>
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
      <ResponsiveContainer width="100%" height={300} style={{margin: '50px auto'}}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fill: "#6c757d" }} />
          <YAxis tick={{ fill: "#6c757d" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="positive" fill="#D80000" name="Negative Review" barSize={20} radius={[8,8,0,0]}/>
          <Bar dataKey="negative" fill="#595959" name="Positive Review" barSize={20} radius={[8,8,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ReviewChart;