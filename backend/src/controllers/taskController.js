const tasks = require('../models/task');

// Create a new task
async function createTask(req, res, next) {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await tasks.create({ title: title.trim() });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

// Get all tasks
async function getTasks(req, res, next) {
  try {
    const allTasks = await tasks.find().sort({ createdAt: -1 });
    res.status(200).json(allTasks);
  } catch (err) {
    next(err);
  }
}

// Update a task
async function updateTask(req, res, next) {
  try {
    const id = req.params.id;
    const { title, completed } = req.body;

    const task = await tasks.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (typeof title === 'string') task.title = title.trim();
    if (typeof completed === 'boolean') task.completed = completed;
    task.updatedAt = Date.now();

    await task.save();
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}

// Delete a task
async function deleteTask(req, res, next) {
  try {
    const id = req.params.id;
    const task = await tasks.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
}

// Delete all completed tasks
async function deleteCompletedTasks(req, res, next) {
  try {
    await tasks.deleteMany({ completed: true });
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
