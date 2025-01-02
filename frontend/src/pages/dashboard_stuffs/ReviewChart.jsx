import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
{ rating: "5",  count: 20000    },
{ rating: "4",  count: 8000   }, 
{ rating: "3", count: 5000,   },
{ rating: "2",count: 2000,    }, 
{ rating: "1", count: 10000,  },
];

const ReviewChart = () => (
    <div style={{ 
        display: 'flex',
        flexDirection: 'column', 
        minWidth: '800px', 
        height: "auto",
        border: '1px solid white', 
        margin: '50px auto',
        borderRadius: '8px',
        padding: 3,
        border: "1px solid rgba(255, 255, 255, 0.3)", 
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)", 
        color: "#333"}}>
        <h3 style={{ color: "#2c3e50"}}>Review Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                layout="vertical"
                width={600}
                height={400}
                data={data}
                margin={{
                top: 20,
                right: 30,
                left: 100,
                bottom: 5,}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis  type="number"/>
                <YAxis dataKey="rating" type="category"/>
                <Tooltip />
                <Bar dataKey="count" fill="#E1F537" barSize={20}/>
            </BarChart>
        </ResponsiveContainer>
    </div>
);

export default ReviewChart;
