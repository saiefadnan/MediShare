import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ReviewChart = () => {
  const data = [
    { day: 'JAN', Previous: 15000, Present: 14000 },
    { day: 'FEB', Previous: 20000, Present: 18000 },
    { day: 'MAR', Previous: 10000, Present: 25000 },
    { day: 'APR', Previous: 15000, Present: 14000 },
    { day: 'MAY', Previous: 12000, Present: 15000 },
    { day: 'JUN', Previous: 18000, Present: 20000 },
    { day: 'JUL', Previous: 20000, Present: 17000 }
  ];  

  return (
    <div style={{ 
        display: 'flex',
        flexDirection: 'column', 
        minWidth: '800px', 
        height: "auto",
        border: '1px solid white', 
        borderRadius: '8px',
        padding: '20px',
        border: "1px solid rgba(255, 255, 255, 0.3)", 
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)", 
        color: "#333",
        margin: '50px auto'}}>
      <h3 style={{ color: "#2c3e50"}}>Review by date</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tick={{ fill: "#6c757d" }} />
          <YAxis tick={{ fill: "#6c757d" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Previous" fill="#D80000" name="Negative Review" barSize={20} radius={[8,8,0,0]}/>
          <Bar dataKey="Present" fill="#595959" name="Positive Review" barSize={20} radius={[8,8,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReviewChart;