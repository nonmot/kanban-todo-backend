import { Router } from "express";
import { Request } from "express";
import prisma from "../lib/prisma";

import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from "../controllers/todoController";
import { requireAuth } from "../middlewares/requireAuth";
import { requireSelf } from "../middlewares/requireSelf";
import { requireOwner } from "../middlewares/requireOwner";

const loadTodoOwner = async (req: Request) => {
  const todoId = String(req.params.id);
  const todo = await prisma.todo.findUnique({
    where: { id: todoId },
    select: { authorId: true },
  });
  return todo ? { ownerId: todo.authorId } : null
}

const router = Router();

router.get("/all/:userId", requireAuth, requireSelf('userId'), getTodos);
router.get("/:id", requireAuth, getTodo);
router.post("/", requireAuth, createTodo);
router.put("/:id", requireAuth, requireOwner(loadTodoOwner), updateTodo);
router.delete("/:id", requireAuth, requireOwner(loadTodoOwner), deleteTodo);

export default router;
