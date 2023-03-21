import { create, list } from "./tickets";
import { Router } from "express";

const ticketRouter = Router();

// TODO: Need to review how to properly name endpoints
ticketRouter.post("/", create);
ticketRouter.get("/filter", list);

export default ticketRouter;
