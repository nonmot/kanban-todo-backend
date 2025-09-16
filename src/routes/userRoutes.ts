import { Router } from "express";

import { createUser, getUsers, getUser, updateUser, deleteUser } from "../controllers/userController";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();

router.get("/", requireAuth, getUsers)
router.get("/:id", requireAuth, getUser)
router.post("/", requireAuth, createUser);
router.put("/:id", requireAuth, updateUser);
router.delete("/:id", requireAuth, deleteUser);

export default router;
