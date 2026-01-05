const mongoose = require('mongoose');

exports.connectDatabase = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://aig-tasker:aig-tasker@cluster0.garfpzj.mongodb.net/aig-tasker?retryWrites=true&w=majority"
        );
        console.log("Connected to MongoDB Successfully!");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};
