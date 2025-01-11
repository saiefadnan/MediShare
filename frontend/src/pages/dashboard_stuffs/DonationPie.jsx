import { Box } from '@mui/material';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Donators', value: 4000 },
  { name: 'Collectors', value: 3000 },
  { name: 'Others', value: 2000 },
];

const COLORS = ['#006AFF', '#52C93A', '#FF2727'];

const DonationPie = () => {
    return ( 
        <Box sx={{ 
            backgroundColor: "#DCEAE3", 
            minWidth: "490px", 
            height: "400px" , 
            margin: '50px auto',
            padding: '50px',
            borderRadius: '8px',
            border: "1px solid rgba(255, 255, 255, 0.3)", 
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",}}>
            <ResponsiveContainer width="100%" height={310}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={50}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
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