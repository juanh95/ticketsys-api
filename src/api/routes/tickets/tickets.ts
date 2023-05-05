import { RequestHandler } from "express";
import { CreateTicketDTO } from "../../dto/ticket.dto";
import * as ticketController from "../../controllers/ticket/index";

// The following function is called `create` and it is of type RequestHandler.
// It takes in the HTTP request object, response object, and next middleware function as arguments.
export const create: RequestHandler = async (req, res, next) => {
   try {
      // The `CreateTicketDTO` type assertion is used to cast the request payload to the expected structure.
      const payload: CreateTicketDTO = req.body;

      // The `create` function on the `ticketController` object is called with the extracted payload as an argument.
      const result = await ticketController.create(payload);

      // A success response with a status code of 200 and the created ticket object is sent to the client.
      res.status(200).send(result);
   } catch (error) {
      // If an error occurs during creation of the ticket, a failure response with a status code of 500 and a JSON error message is sent to the client.
      res.status(500).json({ msg: "Unable to create ticket" });
   }
};

/*
   TODO: Need to expand filtering criteria and add option to combine with OR clause
*/
// The following function is called `list` and it is of type RequestHandler.
// It takes in the HTTP request object, response object, and next middleware function as arguments.
export const list: RequestHandler = async (req, res, next) => {
   try {
      // The `id`, `status`, `category`, and `priority` properties are extracted from the request's query string.
      const { id, status, category, priority } = req.query;

      // The `listReported` function on the `ticketController` object is called with the extracted properties as arguments.
      const result = await ticketController.listReported(
         id,
         status,
         category,
         priority
      );

      // A success response with a status code of 200 and a JSON object containing the retrieved data is sent to the client.
      res.status(200).json({ data: result });
   } catch (error) {
      // If an error occurs during retrieval of the requested data, a failure response with a status code of 500 and a JSON error message is sent to the client.
      res.status(500).json({ msg: "Unble to list reported" });
   }
};
