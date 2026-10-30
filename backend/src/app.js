import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import { protect } from "./middleware/authMiddleware.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes)

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskFlow API is running!",
  });
});

app.get("/api/auth/me", protect ,(req, res)=>{
    res.status(200).json({
    success: true,
    message: "You are authenticated",
    user: req.user,
  });
})

export default app;