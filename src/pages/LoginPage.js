// frontend/src/pages/LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../LoginPage.css'; // Import the CSS file with the correct relative path

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setMessage('Login successful!');
      setTimeout(() => navigate('/tasks'), 1000); // Redirect to tasks page after 1 second
    } catch (error) {
      setMessage('Invalid credentials');
    }
  };

  return (
    <div className="home-container">
      <div className="banner">
        <h1>Task Management App</h1>
        <p>Get Things Done with Ease</p>
      </div>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <br></br>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <br></br>
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>} {/* Display message */}
      </div>
      <div className="register-container">
        <h2>New User?</h2>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
