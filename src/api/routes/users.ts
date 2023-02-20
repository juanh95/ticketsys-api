import {
  createUser,
  deleteUser,
  listUsers,
  retrieveUser,
  updateUser,
} from "../controllers/user";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", listUsers);
userRouter.post("/", createUser);

userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", updateUser);
userRouter.get("/:id", retrieveUser);

export default userRouter;
