import { createUser, deleteUser, listUsers } from "../controllers/user";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", listUsers);
userRouter.post("/", createUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
