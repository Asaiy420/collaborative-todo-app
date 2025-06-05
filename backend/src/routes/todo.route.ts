import { Router } from "express";
import { protectRoute } from "../middleware/auth.js";
import { createTodo } from "../controllers/todo.controller.js";

const router = Router();

router.post("/create", protectRoute, createTodo);

export default router;
