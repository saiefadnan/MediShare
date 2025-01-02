import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Pending', value: 4000 },
  { name: 'Success', value: 3000 },
  { name: 'Failure', value: 2000 },
];

const COLORS = ['#FF2727', '#52C93F', '#006AFF'];

const Piechart = () => {
    return ( 
        <div style={{ 
            backgroundColor: "#DCEAE3", 
            minWidth: "400px", 
            height: "auto" , 
            margin: '20px auto',
            padding: '50px',
            borderRadius: '8px'}}>
            <ResponsiveContainer width="100%" height={300}
            sx={{ 
                backgroundColor: "#DCEAE3", 
                minWidth: "400px", 
                height: "auto" , 
                margin: '20px auto',
                padding: '50px',
                borderRadius: '8px'}}>
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
  </div> 
  );
}
 
export default Piechart;