import { Router } from "express";
import ticketRouter from "./tickets";
import userRouter from "./users/index";
import commentRouter from "./comments";
import groupRouter from "./groups";

const router = Router();

router.use("/users", userRouter);
router.use("/tickets", ticketRouter);
router.use("/comments", commentRouter);
router.use("/groups", groupRouter);

export default router;
