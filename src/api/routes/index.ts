import { Router } from "express";
import tokenRouter from "./tokens";
import userRouter from "./users";

const router = Router();

router.use("/users", userRouter);
router.use("/tokens", tokenRouter);

export default router;
