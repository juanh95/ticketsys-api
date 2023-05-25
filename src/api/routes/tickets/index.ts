import { create, list, update, retrieve } from "./tickets";
import { Router } from "express";
import { tryCatch } from "../../../lib/tryCatch";

const ticketRouter = Router();

// TODO: Need to review how to properly name endpoints
/*
   The `tryCatch` function wraps the request functions so that any
   errors that occur inside of it are caught and handled properly
*/

ticketRouter.post("/", tryCatch(create));
ticketRouter.get("/", tryCatch(list));
ticketRouter.get("/:id", tryCatch(retrieve));
ticketRouter.put("/:id", tryCatch(update));

export default ticketRouter;
