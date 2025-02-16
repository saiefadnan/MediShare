import { useState } from "react";
import "../styles/login.css";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with email:", email);
    setError('');
    setSuccess('');
    try {
      console.log("Sending POST request to /api with email:", email);
      const response = await fetch('http://localhost:5000/api/user/forgot-password', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(data.message);
      } else {
        setError(data.error || 'An unexpected error occurred');
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setError(error.response?.data?.error || "An unexpected error occurred");
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
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600', textAlign: 'left' }}>Forgot Password</h2>
        <p style={{ marginBottom: '1.5rem', fontSize: '1rem', fontWeight: '400', textAlign: 'left' }}>
            Enter your email address and we&apos;ll send you a link to reset your password
        </p>
        <form 
          onSubmit={handleSubmit} 
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
            <div className="input-group">
                <div className="input-container">
                  <i className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2m20 0v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6m20 0l-10 7L2 6" />
                    </svg>
                  </i>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
            </div>
            <button type="submit" className="login-button" style={{margin: '0'}}>Submit</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
        <div className="links-container" style={{alignItems: 'center', display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
            <p onClick={handleLoginClick} style={{margin: '0'}}>Back to Login</p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
