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
export const list: RequestHandler = async (req, res, next) => {
  try {
    const id: number = Number(req.query.id);
    const option: string = String(req.query.option);
    const result = await ticketController.listReported(id, option);

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ msg: "Unble to list reported" });
  }
};
