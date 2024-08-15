import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskAddPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // Handle adding a new task
  const handleAddTask = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/tasks', 
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      navigate('/tasks'); // Redirect to tasks page after adding the task
    } catch (error) {
      console.error('Error adding task:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="task-page-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          required
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskAddPage;
