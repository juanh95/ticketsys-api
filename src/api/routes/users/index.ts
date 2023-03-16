import {
  createUser,
  deleteUser,
  listUsers,
  loginUser,
  retrieveUser,
  updateUser,
} from "./users";
import passport from "passport";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", listUsers);

userRouter.post("/register", createUser);

userRouter.post("/login", loginUser);

userRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);
userRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUser
);
userRouter.get(
  "/myaccount",
  passport.authenticate("jwt", { session: false }),
  retrieveUser
);

export default userRouter;
