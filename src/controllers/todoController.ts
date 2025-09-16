import { Request, Response, NextFunction } from "express"
import prisma from "../lib/prisma";

export const getTodos = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = String(req.params.userId);
    const todos = await prisma.todo.findMany({
      where: {
        authorId: userId,
      },
    });
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
}

export const getTodo = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

export const createTodo = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, authorId, deadline, status } = req.body;
    const newTodo = await prisma.todo.create({
      data: {
        title,
        content,
        authorId,
        deadline,
        status,
      }
    });
    res.status(200).json(newTodo);
  } catch (error) {
    next(error);
  }
}

export const updateTodo = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const { title, content, authorId, deadline, status } = req.body;
    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        authorId,
        deadline,
        status,
      }
    });
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const todo = await prisma.todo.delete({
      where: {
        id,
      },
    });
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}
