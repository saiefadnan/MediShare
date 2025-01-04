import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
{ rating: "5",  count: 20000    },
{ rating: "4",  count: 8000   }, 
{ rating: "3", count: 5000,   },
{ rating: "2",count: 2000,    }, 
{ rating: "1", count: 10000,  },
];

const ReviewBreakdown = () => (
    <div style={{ 
        display: 'flex',
        flexDirection: 'column', 
        minWidth: '560px', 
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
                bottom: 5,}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis  type="number"/>
                <YAxis dataKey="rating" type="category"/>
                <Tooltip />
                <Bar dataKey="count" fill="#E1F537" barSize={20} radius={[0,8,8,0]}/>
            </BarChart>
        </ResponsiveContainer>
    </div>
);

export default ReviewBreakdown;
