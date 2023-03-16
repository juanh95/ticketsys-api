import { Router } from "express";
// import tokenRouter from "./tokens";
import userRouter from "./users/index";

const router = Router();

router.use("/user", userRouter);
// router.use("/token", tokenRouter);

export default router;
