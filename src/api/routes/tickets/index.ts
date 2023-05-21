import { create, list, update, retrieve } from "./tickets";
import { Router } from "express";

const ticketRouter = Router();

// TODO: Need to review how to properly name endpoints
ticketRouter.post("/", create);
ticketRouter.get("/", list);
ticketRouter.get("/:id", retrieve);
ticketRouter.put("/:id", update);

export default ticketRouter;
