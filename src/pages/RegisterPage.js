import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../RegisterPage.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      setMessage('Registration successful!');
      setTimeout(() => navigate('/tasks'), 1000); // Redirect to tasks page after 1 second
    } catch (error) {
      setMessage('Error registering user');
    }
  };

  return (
    <div className="register-page-container">
      <div className="phone-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>} {/* Display message */}
        <button className="login-button" onClick={() => navigate('/login')}>
          Already a user? Login
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
