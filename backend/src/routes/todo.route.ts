import { Router } from "express";
import { protectRoute } from "../middleware/auth.js";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todo.controller.js";

const router = Router();

router.get("/", protectRoute, getTodos)
router.post("/create", protectRoute, createTodo);
router.put("/update/:id", protectRoute, updateTodo);
router.delete("/delete/:id", protectRoute, deleteTodo);

export default router;
