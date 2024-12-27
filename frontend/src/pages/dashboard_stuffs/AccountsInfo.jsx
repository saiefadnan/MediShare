import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const AccountsInfo = () => {
  const donors = [
    { name: "user_01", status: "Regular", amount: "$500" ,edit: "details"},
    { name: "user_02", status: "Frequent", amount: "$800" ,edit: "details"},
    { name: "user_03", status: "Limited", amount: "$200" ,edit: "details"},
    { name: "user_01", status: "Regular", amount: "$500" ,edit: "details"},
    { name: "user_02", status: "Frequent", amount: "$800" ,edit: "details"},
    { name: "user_03", status: "Limited", amount: "$200" ,edit: "details"},
    { name: "user_01", status: "Regular", amount: "$500" ,edit: "details"},
    { name: "user_02", status: "Frequent", amount: "$800" ,edit: "details"},
    { name: "user_01", status: "Regular", amount: "$500" ,edit: "details"},
    { name: "user_02", status: "Frequent", amount: "$800" ,edit: "details"},
    { name: "user_03", status: "Limited", amount: "$200" ,edit: "details"},
    { name: "user_01", status: "Regular", amount: "$500" ,edit: "details"},
    { name: "user_02", status: "Frequent", amount: "$800" ,edit: "details"},
    { name: "user_03", status: "Limited", amount: "$200" ,edit: "details"},
    { name: "user_01", status: "Regular", amount: "$500" ,edit: "details"},
    { name: "user_02", status: "Frequent", amount: "$800" ,edit: "details"},
  ];
  return (
    <div style={{
        display: 'flex', 
        width: '90%', 
        maxHeight: '800px', 
        margin: '50px auto',
        padding: '20px'}}>
        <TableContainer component={Paper} style={{backgroundColor: "#DCEAE3", padding: '30px'}}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Account Status</TableCell>
                <TableCell>Contribution</TableCell>
                <TableCell>Edit</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {donors.map((donor, index) => (
                <TableRow key={index}>
                <TableCell>{donor.name}</TableCell>
                <TableCell>{donor.status}</TableCell>
                <TableCell>{donor.amount}</TableCell>
                <TableCell>{donor.edit}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
};

export default AccountsInfo;
