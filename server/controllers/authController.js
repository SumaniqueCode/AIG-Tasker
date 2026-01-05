const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, username, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully", user: { id: user._id, name: user.name, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: "Registration failed" });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        res.json({ message: "Login successful", user: { id: user._id, name: user.name, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
};
