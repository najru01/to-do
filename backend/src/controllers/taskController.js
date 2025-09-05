const Task = require('../models/task');
const User = require('../models/user');

// Create a new task (user-specific)
async function createTask(req, res, next) {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title: title.trim(),
      user: req.user._id, // tie task to logged-in user
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

// Get all tasks for logged-in user
async function getTasks(req, res, next) {
  try {
    const allTasks = await Task.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json(allTasks);
  } catch (err) {
    next(err);
  }
}

// Update a task (only if it belongs to the user)
async function updateTask(req, res, next) {
  try {
    const id = req.params.id;
    const { title, completed } = req.body;

    const task = await Task.findOne({ _id: id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (typeof title === "string") task.title = title.trim();
    if (typeof completed === "boolean") task.completed = completed;
    task.updatedAt = Date.now();

    await task.save();
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}

// Delete a task (only if it belongs to the user)
async function deleteTask(req, res, next) {
  try {
    const id = req.params.id;

    const task = await Task.findOne({ _id: id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
}

// Delete all completed tasks (only for logged-in user)
async function deleteCompletedTasks(req, res, next) {
  try {
    await Task.deleteMany({ completed: true, user: req.user._id });
    res.status(200).json({ message: "All completed tasks deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  deleteCompletedTasks,
};
