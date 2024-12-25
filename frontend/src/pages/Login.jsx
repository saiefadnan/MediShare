import { useState } from 'react'
import '../styles/login.css'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Email:', email)
        console.log('Password:', password)
   }   

  return (
    <div className="login-container">
      <div className="brand-section">
        <div className="illustration-container">
        <img src="/img/medisharelogin.png" alt="MediShare Login" className='medical-illustration' />
        </div>
      </div>

      <div className="form-section">
        <div className="login-card">
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input-container">
                <i className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2m20 0v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6m20 0l-10 7L2 6" />
                  </svg>
                </i>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            <div className="links-container">
              <a href="/create-account">Create an account</a>
              <a href="/forgot-password">Forgot password</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

