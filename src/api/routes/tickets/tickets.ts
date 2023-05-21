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
      return res.status(200).send(result);
   } catch (error) {
      // If an error occurs during creation of the ticket, a failure response with a status code of 500 and a JSON error message is sent to the client.
      return res.status(500).json({ msg: "Unable to create ticket" });
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
      const result = await ticketController.list(
         id,
         status,
         category,
         priority
      );

      // A success response with a status code of 200 and a JSON object containing the retrieved data is sent to the client.
      return res.status(200).json({ data: result });
   } catch (error) {
      // If an error occurs during retrieval of the requested data, a failure response with a status code of 500 and a JSON error message is sent to the client.
      return res.status(500).json({ msg: "Unble to list reported" });
   }
};

export const retrieve: RequestHandler = async (req, res, next) => {
   try {
      const id: number = +req.params.id;

      const result = await ticketController.retrieve(id);

      return res.status(200).send(result);
   } catch (error) {
      if (error instanceof Error) {
         if (error.message.includes("No Ticket Found")) {
            console.log(error.message);
            return res.status(404).send(error.message);
         }
      }

      return res.status(500).send(error);
   }
};

// This exports a named `update` function of type `RequestHandler`
export const update: RequestHandler = async (req, res, next) => {
   try {
      // Extract the `id` from the request parameters and convert it to a number
      const id: number = +req.params.id;
      // Extract the fields to be updated from the request body
      const fields = req.body;

      // Call the `ticketController.update` method with the `id` and `fields`
      const result = await ticketController.update(id, fields);

      // Send a success response with the updated ticket data
      return res.status(200).json({ success: true, data: result });
   } catch (error) {
      // If an error occurred inside the try block, handle it here
      if (error instanceof Error) {
         // Check whether the error message indicates that no ticket was found
         if (error.message.includes("No Ticket Found")) {
            // Send a 404 status code with the error message as the response
            return res.status(404).send(error.message);
         }
      }
      console.log(error);
      return res.status(500).send(error);
   }
};
