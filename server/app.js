const express = require('express');
const { connectDatabase } = require('./database/database');
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const cors = require('cors');
const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'https://aig-tasker.vercel.app'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDatabase();
app.use((req, res, next) => {
    console.log(`${req.method}: http://127.0.0.1${req.originalUrl}`);
    next();
});

app.get('/', (req, res) => res.send("Hello World! This is homepage"));
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);


const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
});

