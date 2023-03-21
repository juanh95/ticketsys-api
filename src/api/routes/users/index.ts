import { create, login, retrieveFromJwt } from "./users";
import passport from "passport";
import { Router } from "express";

const userRouter = Router();

// userRouter.get("/", listUsers);

userRouter.post("/register", create);

userRouter.post("/login", login);

userRouter.get(
  "/myaccount",
  passport.authenticate("jwt", { session: false }),
  retrieveFromJwt
);

// userRouter.delete(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   deleteUser
// );
// userRouter.put(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   updateUser
// );

export default userRouter;
