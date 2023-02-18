import { Router } from "express";
import { createUser, deleteUser, listUsers } from "../controllers/user";

const router = Router();

router.get("/", listUsers);
router.post("/", createUser);
router.delete("/:id", deleteUser);

export default router;
