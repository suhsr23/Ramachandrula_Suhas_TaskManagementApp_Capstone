import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskItem from '../components/TaskItem';
import '../TaskPage.css'; // Ensure the CSS file is imported

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const navigate = useNavigate();

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
  }, [navigate]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/tasks', 
        { title: newTask, description: newDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setTasks([...tasks, response.data]);
      setNewTask('');
      setNewDescription('');
    } catch (error) {
      console.error('Error adding task:', error.response?.data?.message || error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="task-page-container">
      <div className="task-content">
        <h2>Task Management</h2>
        <div className="task-input-container">
          <form onSubmit={handleAddTask}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="New Task Title"
              required
            />
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="New Task Description"
              required
            />
            <br></br>
            <button type="submit">Add Task</button>
          </form>
        </div>
        <div className="task-list-container">
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                <TaskItem task={task} onDelete={handleDeleteTask} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
