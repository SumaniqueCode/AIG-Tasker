const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  created_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
},{ timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
