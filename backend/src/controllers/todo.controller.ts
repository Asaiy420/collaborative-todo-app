import {Request, Response} from "express";


export const createTodo = async (req:Request, res:Response): Promise<void> => {
    res.send("Hello world")
}

export const getTodos = async (req:Request, res:Response): Promise<void> => {
    
}