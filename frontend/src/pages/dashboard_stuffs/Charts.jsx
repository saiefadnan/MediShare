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
      <div style={{ 
        backgroundColor: "#DCEAE3", 
        minWidth: '800px',
        height: "auto" , 
        margin: '20px auto',
        padding: '50px',
        borderRadius: '8px'}}>
        <ResponsiveContainer width="100%" height={300}>
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
    </div>  );
}
 
export default Charts;