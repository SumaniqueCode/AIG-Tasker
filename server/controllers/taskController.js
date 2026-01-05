const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.find({created_by : userId});
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title, description, status, created_by } = req.body;
        const task = new Task({ title, description, created_by, status });
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ error: "Failed to create task" });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: "Failed to update task" });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(400).json({ error: "Failed to delete task" });
    }
};
