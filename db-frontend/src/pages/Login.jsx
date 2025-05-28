import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Footer from './Footer';

const Login = ({ setIsLoggedIn }) => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (userName === 'admin' && userPassword === 'admin123') {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div>
      <div className="hero-wrapper">
        <div className="hero-box">
          <h1>Welcome Back</h1>
          <p>Please log in to access your account</p>
          <form onSubmit={handleLogin} className="login-form">
            {errorMessage && <p className="error-alert">{errorMessage}</p>}
            <div className="input-container">
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
