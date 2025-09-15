import { Router } from "express";

import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from "../controllers/todoController";

const router = Router();

router.get("/all/:userId", getTodos);
router.get("/:id", getTodo);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
