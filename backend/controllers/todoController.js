const db = require("../models");
const Todo = db.todos;

// GET all todos
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Error fetching todos' });
    }
};

// POST a new todo
const createTodo = async (req, res) => {
    try {
        const { title, description, completed, dueDate } = req.body;
        const newTodo = await Todo.create({ title, description, completed, dueDate });
        res.json(newTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Error creating todo' });
    }
};

// PUT update a todo
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed, dueDate } = req.body;
        await Todo.update({ title, description, completed, dueDate }, { where: { id } });
        const updatedTodo = await Todo.findByPk(id);
        res.json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Error updating todo' });
    }
};

// DELETE a todo
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.destroy({ where: { id } });
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Error deleting todo' });
    }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
