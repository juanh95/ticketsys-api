import { Router } from "express";
import ticketRouter from "./tickets";
import userRouter from "./users/index";
import commentRouter from "./comments";
import groupRouter from "./groups";
import path from "path";
import passport from "passport";

const router = Router();

router.use("/users", userRouter);
router.use(
   "/tickets",
   passport.authenticate("jwt", { session: false }),
   ticketRouter
);
router.use(
   "/comments",
   passport.authenticate("jwt", { session: false }),
   commentRouter
);
router.use("/groups", groupRouter);

router.get("/home", (req, res) => {
   res.sendFile(path.join(__dirname, "../../pages/home.html"));
});

export default router;
