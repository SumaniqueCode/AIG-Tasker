const mongoose = require("mongoose");

let cached = global.mongoose;
const uri = "mongodb+srv://aig-tasker:aig-tasker@cluster0.garfpzj.mongodb.net/aig-tasker?retryWrites=true&w=majority";

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

exports.connectDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  console.log("Connected to MongoDB Successfully!");
  return cached.conn;
};
