import { useState, useEffect } from 'react'
import '../styles/login.css'
import loginAnimated from '../assets/tablet-login-animate.svg'
import signupAnimated from '../assets/sign-up-animate.svg'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isTransformed, setIsTransformed] = useState(false);
  const [showFormSection, setShowFormSection] = useState(false);
  const [showLoginSection, setShowLoginSection] = useState(true);
  const [fadeClass, setFadeClass] = useState('');
  const [imageSrc, setImageSrc] = useState(loginAnimated);

  const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Email:', email)
        console.log('Password:', password)
  }  
  const handleCreateAccountClick = () => {
    setFadeClass('fade-out');
    setTimeout(() => {
      setIsTransformed(true);
      setFadeClass('fade-in');
    }, 700);
  };
  const handleLoginClick = () => {
    setFadeClass('fade-out');
    setTimeout(() => {
      setIsTransformed(false);
      setFadeClass('fade-in');
    }, 700);
  }; 
  useEffect(() => {
    if (isTransformed) {
      setShowLoginSection(false);
      setTimeout(() => {
        setShowFormSection(true);
      }, 1000);
    } else {
      setShowFormSection(false);
      setTimeout(() => {
        setShowLoginSection(true);
      }, 1000);
    }
  }, [isTransformed]);

  useEffect(() => {
    const newSrc = showLoginSection
      ? `${loginAnimated}?t=${Date.now()}`
      : `${signupAnimated}?t=${Date.now()}`;

    setImageSrc(newSrc);
  }, [showLoginSection]);

  return (
    <div className="login-container">
      <div className={`brand-section ${isTransformed ? 'transformed' : ''}`}>
      <img
        src={imageSrc}
        alt={showLoginSection ? 'login' : 'signup'}
        style={{ width: '90%', height: 'auto' }}
      />
      </div>

      {showLoginSection && (
        <div className={`form-section ${fadeClass}`}>
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
                <p onClick={handleCreateAccountClick}>Create an account</p>
                <p>Forgot password</p>
              </div>
            </form>
          </div>
        </div>
      )}
      {showFormSection && (
        <div className={`form-section1 ${fadeClass}`}>
          <div className="signup-card">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
            <div className="input-group">
                <div className="input-container">
                  <i className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  </i>
                  <input
                    type="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
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
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="login-button">
                Sign Up
              </button>
              <div className="links-container">
                <p onClick={handleLoginClick}>Already have an account?</p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginPage

