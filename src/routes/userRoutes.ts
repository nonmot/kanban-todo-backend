import { Router } from "express";

import { createUser, getUsers, getUser, updateUser, deleteUser } from "../controllers/userController";
import { requireAuth } from "../middlewares/requireAuth";
import { requireSelf } from "../middlewares/requireSelf";

const router = Router();

router.get("/", requireAuth, getUsers)
router.get("/:id", requireAuth, requireSelf('id'), getUser)
router.post("/", requireAuth, createUser);
router.put("/:id", requireAuth, requireSelf('id'), updateUser);
router.delete("/:id", requireAuth, requireSelf('id'), deleteUser);

export default router;
