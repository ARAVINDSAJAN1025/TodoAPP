const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the process if MongoDB connection fails
    });

app.get('/get', async (req, res) => {
    console.log('sorry')
    try {
        const todos = await TodoModel.find();
        console.log(todos)
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(id, { done: true }, { new: true });
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTodo = await TodoModel.findByIdAndDelete(id);
        res.json(deletedTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/add', async (req, res) => {
    const { task } = req.body;
    console.log(task,'task')
    try {
        const newTodo = await TodoModel.create({ task });
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


const PORT = process.env.PORT || 3001; // Use environment variable for port or default to 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
