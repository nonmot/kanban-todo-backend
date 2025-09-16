import { Router } from "express";

import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from "../controllers/todoController";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();

router.get("/all/:userId", requireAuth, getTodos);
router.get("/:id", requireAuth, getTodo);
router.post("/", requireAuth, createTodo);
router.put("/:id", requireAuth, updateTodo);
router.delete("/:id", requireAuth, deleteTodo);

export default router;
