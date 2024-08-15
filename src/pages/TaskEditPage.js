// frontend/src/pages/TaskEditPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TaskEditPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();  // Get the task ID from the URL
  const navigate = useNavigate();

  // Fetch the task data when the component mounts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTitle(data.title);
        setDescription(data.description);
      } catch (error) {
        console.error('Error fetching task:', error.response?.data?.message || error.message);
      }
    };
    fetchTask();
  }, [id]);

  // Handle form submission to update the task
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/tasks/${id}`,  // URL to update the task
        { title, description },  // Data to update
        {
          headers: {
            Authorization: `Bearer ${token}`,  // JWT token for authentication
            'Content-Type': 'application/json',  // Content type
          },
        }
      );
      navigate('/tasks');  // Redirect to the task list after updating
    } catch (error) {
      console.error('Error updating task:', error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Update Task</button>
    </form>
  );
};

export default TaskEditPage;
