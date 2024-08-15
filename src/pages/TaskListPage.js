// frontend/src/pages/TaskListPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TaskItem from '../components/TaskItem';

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error.response?.data?.message || error.message);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Your Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <TaskItem task={task} />
            <Link to={`/tasks/${task._id}/edit`}>Edit</Link> {/* Link to edit task */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskListPage;
