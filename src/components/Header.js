import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/login'); // Redirect to the login page
  };

  // Only show the logout button on the tasks page
  if (location.pathname === '/tasks') {
    return (
      <header className="header">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
    );
  }

  return null; // No header content for other pages
};

export default Header;
