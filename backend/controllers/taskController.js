// backend/controllers/taskController.js

const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

// Create a new task
exports.createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error('Title and Description are required');
  }

  const newTask = new Task({
    title,
    description,
    user: req.user.id,
  });

  await newTask.save();
  res.status(201).json(newTask);
});

// Get all tasks for the logged-in user
exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

// Get a single task by ID
exports.getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task || task.user.toString() !== req.user.id) {
    res.status(404);
    throw new Error('Task not found');
  }

  res.json(task);
});

// Update an existing task
exports.updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted } = req.body;

  const task = await Task.findById(id);

  if (!task || task.user.toString() !== req.user.id) {
    res.status(404);
    throw new Error('Task not found');
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.isCompleted = isCompleted !== undefined ? isCompleted : task.isCompleted;
  await task.save();

  res.json(task);
});

// Delete a task
exports.deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task || task.user.toString() !== req.user.id) {
    res.status(404);
    throw new Error('Task not found');
  }

  await task.remove();
  res.json({ message: 'Task removed' });
});
