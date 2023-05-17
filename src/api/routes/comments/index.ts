import { create } from "./comments";
import Router from "express";

const commentRouter = Router();

commentRouter.post("/", create);

export default commentRouter;
