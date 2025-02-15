import { useState } from "react";
import { Container, TextField, Button, Card, CardContent, Typography } from "@mui/material";

export default function JoinUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    background: "",
    reason: "",
    idFile: null,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, idFile: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Submitting form", formData);
  };

  return (
    <Container maxWidth="sm" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", fontFamily: "Roboto" }}>
      <Card style={{ padding: "24px", width: "100%", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", backgroundColor:"transparent" }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom style={{ fontFamily: "Roboto", fontWeight: 600 }}>
            Join as an Admin
          </Typography>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <TextField label="Full Name" name="fullName" required onChange={handleChange} fullWidth />
            <TextField label="Email Address" type="email" name="email" required onChange={handleChange} fullWidth />
            <TextField label="Phone Number" name="phone" required onChange={handleChange} fullWidth />
            <TextField label="Medical Background (optional)" name="background" onChange={handleChange} fullWidth />
            <TextField label="Why do you want to join?" name="reason" multiline rows={3} required onChange={handleChange} fullWidth />
            <input type="file" name="idFile" required onChange={handleFileChange} style={{ margin: "8px 0" }} />
            <TextField label="Password" type="password" name="password" required onChange={handleChange} fullWidth />
            <TextField label="Confirm Password" type="password" name="confirmPassword" required onChange={handleChange} fullWidth />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}