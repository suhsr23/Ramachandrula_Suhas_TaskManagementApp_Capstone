import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import TaskListPage from './pages/TaskListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskAddPage from './pages/TaskAddPage';
import TaskEditPage from './pages/TaskEditPage';
import TaskPage from './pages/TaskPage';
import './App.css';

const App = () => {
  const location = useLocation(); // Get the current route

  return (
    <div>
      {/* Conditionally render the Header component */}
      {location.pathname !== '/' && location.pathname !== '/login' && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Set LoginPage as the home page */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/tasks/add" element={<TaskAddPage />} />
        <Route path="/tasks/:id/edit" element={<TaskEditPage />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
