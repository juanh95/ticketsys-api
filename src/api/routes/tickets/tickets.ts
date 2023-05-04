import { RequestHandler } from "express";
import { CreateTicketDTO } from "../../dto/ticket.dto";
import * as ticketController from "../../controllers/ticket/index";

export const create: RequestHandler = async (req, res, next) => {
   try {
      const payload: CreateTicketDTO = req.body;
      const result = await ticketController.create(payload);
      res.status(200).send(result);
   } catch (error) {
      res.status(500).json({ msg: "Unable to create ticket" });
   }
};

// Will be using query params
// Need to expand filtering options
export const list: RequestHandler = async (req, res, next) => {
   try {
      const id: number = Number(req.query.id);
      const status: string = String(req.query.status);
      const result = await ticketController.listReported(id, status);

      res.status(200).json({ data: result });
   } catch (error) {
      res.status(500).json({ msg: "Unble to list reported" });
   }
};
