import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CollectionChart = () => {
  const data = [
    { day: "Monday", Previous: 15000, Present: 14000 },
    { day: "Tuesday", Previous: 20000, Present: 18000 },
    { day: "Wednesday", Previous: 10000, Present: 25000 },
    { day: "Thursday", Previous: 15000, Present: 14000 },
    { day: "Friday", Previous: 12000, Present: 15000 },
    { day: "Saturday", Previous: 18000, Present: 20000 },
    { day: "Sunday", Previous: 20000, Present: 17000 },
  ];

  return (
    <div style={{ 
      backgroundColor: "#F4E9FC", 
      borderRadius: "8px", 
      padding: "20px",
      margin: '50px auto',
      minWidth: "800px", 
      height: "auto" , }}>
      <h3 style={{ color: "#2c3e50"}}>Collection Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tick={{ fill: "#6c757d" }} />
          <YAxis tick={{ fill: "#6c757d" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Previous" fill="#007bff" name="Previous week" barSize={20} />
          <Bar dataKey="Present" fill="#28a745" name="Present week" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CollectionChart;
