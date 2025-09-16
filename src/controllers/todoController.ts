import { Request, Response, NextFunction } from "express"
import prisma from "../lib/prisma";
import { Status } from "@prisma/client";

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
    const data: {
      title?: string;
      content?: string;
      deadline?: Date;
      status?: Status;
    } = {
      title: req.body.title,
      content: req.body.content,
      deadline: req.body.deadline,
      status: req.body.status,
    }
    console.log(data);
    if (Object.values(data).every(v => v === undefined)) {
      return res.status(400).json({ message: 'No todo to be updated' });
    }
    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data,
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
