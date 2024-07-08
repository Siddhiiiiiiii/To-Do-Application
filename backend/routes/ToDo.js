const express = require('express');
const router = express.Router();
const db = require('../models');
const Todo = db.Todo; 

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new todo
router.post('/', async (req, res) => {
  try {
    const { title, description, completed, dueDate } = req.body;
    const newTodo = await Todo.create({ title, description, completed, dueDate });
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update a todo
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, completed, dueDate } = req.body;
    const [rowsAffected] = await Todo.update({ title, description, completed, dueDate }, { where: { id } });
    res.json({ affectedRows: rowsAffected });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a todo
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const rowsAffected = await Todo.destroy({ where: { id } });
    res.json({ affectedRows: rowsAffected });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
