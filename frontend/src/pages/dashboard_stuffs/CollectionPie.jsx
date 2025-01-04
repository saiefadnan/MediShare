import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Donators', value: 4000 },
  { name: 'Collectors', value: 3000 },
  { name: 'Others', value: 2000 },
];

const COLORS = ['#006AFF', '#52C93A', '#FF2727'];

const CollectionPie = () => {
    return ( 
        <div style={{ 
            backgroundColor: "#FFE2E5", 
            minWidth: "400px", 
            height: "auto" , 
            margin: '50px auto',
            padding: '50px',
            borderRadius: '8px'}}>
            <ResponsiveContainer width="100%" height={300}>
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
 
export default CollectionPie;