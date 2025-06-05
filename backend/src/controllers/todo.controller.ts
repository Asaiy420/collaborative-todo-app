import { Request, Response } from "express";
import Todo from "../models/todo.model.js";
import { AuthRequest } from "../middleware/auth.js";

export const createTodo = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, description, dueDate, collaborators } = req.body;

    if (!title || !description || !dueDate || !collaborators) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const todo = await Todo.create({
      title,
      description,
      dueDate,
      collaborators,
      owner: req.user?.userId,
    });

    res.status(201).json(todo);
    return;
  } catch (error) {
    console.error("Error when creating todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTodos = async (
  req: Request,
  res: Response
): Promise<void> => {};
