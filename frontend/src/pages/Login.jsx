import { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import '../styles/login.css';
import loginAnimated from '../assets/tablet-login-animate.svg';
import signupAnimated from '../assets/sign-up-animate.svg';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTransformed, setIsTransformed] = useState(false);
  const [showFormSection, setShowFormSection] = useState(false);
  const [showLoginSection, setShowLoginSection] = useState(true);
  const [fadeClass, setFadeClass] = useState('');
  const [imageSrc, setImageSrc] = useState(loginAnimated);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
        setAlert({ type: 'error', message: 'Please enter both email and password.' });
        return;
    }
    setIsLoading(true);
    try {
        const response = await fetch('http://localhost:5000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
  
        const result = await response.json();
  
        if (result.success) {
            await login(result.user)
            setAlert({ type: 'success', message: 'Login successful!' });
            navigate('/');
        } else {
            setAlert({ type: 'error', message: result.message || 'Login failed!' });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        setAlert({ type: 'error', message: 'An error occurred while logging in.' });
    } finally {
        setIsLoading(false);
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
        setAlert({ type: 'error', message: 'Please fill in all fields.' });
        return;
    }

    if (password !== confirmPassword) {
        setAlert({ type: 'error', message: 'Passwords do not match!' });
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, gateway: 'local', image_url: null }),
        });

        const result = await response.json();

        if (result.success) {
            setAlert({ type: 'success', message: 'Sign-up successful!' });
            handleLoginClick();
        } else {
            setAlert({ type: 'error', message: result.message || 'Sign-up failed!' });
        }
    } catch (error) {
        console.error("Error signing up:", error);
        setAlert({ type: 'error', message: 'An error occurred while signing up.' });
    }
};

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:5000/api/user/google';
    console.log("Google login clicked");
  };

  const handleForgotPassword = () => {
    navigate('/forgotPassword');
  };

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

  useEffect(() => {
    if (alert?.exit) {
      const timer = setTimeout(() => setAlert(null), 600);
      return () => clearTimeout(timer);
    }
  }, [alert]);
  
  useEffect(() => {
    if (alert && !alert.exit) {
      const timer = setTimeout(() => setAlert({ ...alert, exit: true }), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);
  

  return (
    <div className="login-container">
      {alert && (
        <div className={`alert-container69 ${alert.exit ? 'exit' : ''}`}>
          <Alert
            severity={alert.type}
            onClose={() => setAlert({ ...alert, exit: true })}
          >
            <AlertTitle>{alert.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
            {alert.message}
          </Alert>
        </div>
      )}
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
            <form>
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
              <button type="submit" className="login-button" disabled={isLoading}  onClick={handleLogin}>
                {isLoading ? "Logging in..." : "Login"}
              </button>
              <div className="links-container">
                <p onClick={handleCreateAccountClick}>Create an account</p>
                <p onClick={handleForgotPassword}>Forgot password</p>
              </div>
              <div className="separator">
                <span style={{color: '#6B7280'}}>or with</span>
              </div>
              <button className="login-button" style={{backgroundColor: 'transparent', border: '1px solid #393633', color: '#393633'}} onClick={handleGoogleLogin}>
                <svg
                  xmlSpace="preserve"
                  style={{ enableBackground: 'new 0 0 512 512' }}
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  version="1.1"
                >
                  <path
                    d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
                      c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
                      C103.821,274.792,107.225,292.797,113.47,309.408z"
                    style={{ fill: '#FBBB00' }}
                  ></path>
                  <path
                    d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
                      c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
                      c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                    style={{ fill: '#518EF8' }}
                  ></path>
                  <path
                    d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
                      c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
                      c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                    style={{ fill: '#28B446' }}
                  ></path>
                  <path
                    d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
                      c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
                      C318.115,0,375.068,22.126,419.404,58.936z"
                    style={{ fill: '#F14336' }}
                  ></path>
                </svg>
                <span style={{paddingLeft: '2%'}}>Google</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {showFormSection && (
        <div className={`form-section1 ${fadeClass}`}>
          <div className="signup-card">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <div className="input-group">
                <div className="input-container">
                  <i className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </i>
                  <input
                    type="text"
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
  );
}

export default LoginPage;
