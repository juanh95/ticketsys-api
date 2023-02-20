import { Router } from "express";
import { createToken, retrieveUserFromToken } from "../controllers/token";

const tokenRouter = Router();

tokenRouter.post("/", createToken);
tokenRouter.get("/:id", retrieveUserFromToken);

export default tokenRouter;
