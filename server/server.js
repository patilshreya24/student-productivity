import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const TaskSchema = new mongoose.Schema({
  title: String,
  category: String,
  priority: String,
  deadline: String,
  duration: Number,
  status: String,
});

const Task = mongoose.model("Task", TaskSchema);

app.post("/add-task", async (req, res) => {
  try {
    console.log("Received Task:", req.body);

    const task = new Task(req.body);

    await task.save();

    console.log("Task Saved to MongoDB");

    res.status(201).json({
      message: "Task Saved",
      task,
    });
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      message: "Error saving task",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Backend Working");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});