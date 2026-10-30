import express from "express";
import { createTask , getAllTasks , getTaskById , updateTask , deleteTask} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//create a task (login required)
router.post("/", protect, createTask);

//Get all tasks of the logged-in user
router.get("/", protect, getAllTasks);

//Get one task by Id
router.get("/:id", protect, getTaskById);

//update a task
router.put("/:id", protect, updateTask);

//Delete a task
router.delete("/:id", protect, deleteTask);

export default router;