const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');


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

exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});


exports.getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task || task.user.toString() !== req.user.id) {
    res.status(404);
    throw new Error('Task not found');
  }

  res.json(task);
});


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
