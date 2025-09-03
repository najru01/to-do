const express = require('express');
const router = express.Router();
const {createTask, getTasks, updateTask, deleteTask, deleteCompletedTasks} = require('../controllers/taskController');

//routes
router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.delete('/', deleteCompletedTasks);

module.exports = router;