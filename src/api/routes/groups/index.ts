import { Router } from "express";
import { create } from "./groups";
import { tryCatch } from "../../../lib/tryCatch";
import passport from "passport";

const groupRouter = Router();

groupRouter.post(
   "/",
   passport.authenticate("jwt", { session: false }),
   tryCatch(create)
);

export default groupRouter;
