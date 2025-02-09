import { useState } from "react";
import {useParams} from "react-router-dom";
import "../styles/login.css";

function ResetPassword() {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        console.log("Form submitted with token:", token, "and password:", newPassword);
        try {
          console.log("Sending POST request to /api/user/reset-password with token:", token, "and password:", newPassword);
            const response = await fetch("http://localhost:5000/api/user/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword }),
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error("Error occurred:", error);
            setMessage(error.response?.data?.error || "An unexpected error occurred");
        }
    };
    
  const handleLoginClick = () => {
        window.location.href = '/login';
  };

  return (
    <div 
      className="forgot-password-section" 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh'
      }}
    >
      <div 
        className="forgot-password-card" 
        style={{ 
          backgroundColor: 'transparent', 
          border: '#393633 1px solid',
          padding: '20px', 
          borderRadius: '12px 0px 12px 0px', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
          width: '100%', 
          maxWidth: '400px', 
          textAlign: 'center' 
        }}
      >
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600', textAlign: 'left' }}>Reset Password</h2>
        <p style={{ marginBottom: '1.5rem', fontSize: '1rem', fontWeight: '400', textAlign: 'left' }}>
            Enter a new password for your account
        </p>
        <form 
          onSubmit={handleSubmit} 
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
            <div className="input-group">
                <div className="input-container">
                <i className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </i>
                  <input
                    type="password"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
            </div>
            <div className="input-group">
                <div className="input-container">
                <i className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </i>
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
            </div>
            <button type="submit" className="login-button" style={{margin: '0'}}>Submit</button>
        </form>
        {message && <p style={{ color: 'black', marginTop: '10px' }}>{message}</p>}
        <div className="links-container" style={{alignItems: 'center', display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
            <p onClick={handleLoginClick} style={{margin: '0'}}>Back to Login</p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
