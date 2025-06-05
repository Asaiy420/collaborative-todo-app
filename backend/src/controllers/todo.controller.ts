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
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const todos = await Todo.find({ owner: req.user?.userId });
    res.status(200).json(todos);
    return;
  } catch (error) {
    console.error("Error when getting todos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTodo = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, collaborators } = req.body;

    if (!id) {
      res.status(400).json({ message: "Missing id" });
      return;
    }

    if (!title || !description || !dueDate || !collaborators) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const todo = await Todo.findByIdAndUpdate(id, {
      title,
      description,
      dueDate,
      collaborators,
    });

    res.status(200).json(todo);
  } catch (error) {
    console.error("Error when updating todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTodo = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    const todo = await Todo.findByIdAndDelete(id);

    res.status(200).json(todo);
  } catch (error) {
    console.error("Error when deleting todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
