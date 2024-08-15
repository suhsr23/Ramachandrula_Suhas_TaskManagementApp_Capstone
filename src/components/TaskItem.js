// frontend/src/components/TaskItem.js

import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({ task, onDelete }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <Link to={`/tasks/${task._id}/edit`}>Edit</Link>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
