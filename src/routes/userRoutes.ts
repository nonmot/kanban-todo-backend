import { Router } from "express";

import { createUser, getUsers, getUser, updateUser, deleteUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers)
router.get("/:id", getUser)
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
