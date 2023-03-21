import { Router } from "express";
import ticketRouter from "./tickets";
import userRouter from "./users/index";

const router = Router();

router.use("/users", userRouter);
router.use("/tickets", ticketRouter);
// router.use("/token", tokenRouter);

export default router;
