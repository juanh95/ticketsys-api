import { create, login, retrieve, list, update } from "./users";
import passport from "passport";
import { Router } from "express";
import { tryCatch } from "../../../lib/tryCatch";

const userRouter = Router();

userRouter.get("/", tryCatch(list));

userRouter.post("/register", tryCatch(create));

userRouter.post("/login", tryCatch(login));

userRouter.get(
   "/myaccount",
   passport.authenticate("jwt", { session: false }),
   tryCatch(retrieve)
);

userRouter.put(
   "/",
   passport.authenticate("jwt", { session: false }),
   tryCatch(update)
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
