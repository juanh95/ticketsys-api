import * as userController from "../controllers/userController.js";
import Router from "express";

const router = Router();

router.get("/", userController.listUsers);

router.post("/createuser", userController.createUser);

router.get("/:id", userController.getUser);

export default router;
