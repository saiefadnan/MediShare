import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Donators', value: 4000 },
  { name: 'Collectors', value: 3000 },
  { name: 'Others', value: 2000 },
];

const COLORS = ['#ff7300', '#387908', '#f8d7da'];

const Piechart = () => {
    return ( 
    <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
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
  </ResponsiveContainer> );
}
 
export default Piechart;