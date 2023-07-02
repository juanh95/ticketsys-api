import { RequestHandler } from "express";
import { CreateTicketDTO } from "../../dto/ticket.dto";
import * as ticketController from "../../controllers/ticket/index";

// The following function is called `create` and it is of type RequestHandler.
// It takes in the HTTP request object, response object, and next middleware function as arguments.
export const create: RequestHandler = async (req, res, next) => {
   // The `CreateTicketDTO` type assertion is used to cast the request payload to the expected structure.
   const payload: CreateTicketDTO = req.body;

   console.log("Made it to the route");

   // The `create` function on the `ticketController` object is called with the extracted payload as an argument.
   const result = await ticketController.create(payload);

   // A success response with a status code of 200 and the created ticket object is sent to the client.
   return res.status(200).send(result);
};

/*
   TODO: Need to expand filtering criteria and add option to combine with OR clause
*/
// The following function is called `list` and it is of type RequestHandler.
// It takes in the HTTP request object, response object, and next middleware function as arguments.
export const list: RequestHandler = async (req, res, next) => {
   // The `id`, `status`, `category`, and `priority` properties are extracted from the request's query string.
   const { id, status, category, priority } = req.query;

   // The `listReported` function on the `ticketController` object is called with the extracted properties as arguments.
   const result = await ticketController.list(id, status, category, priority);

   // A success response with a status code of 200 and a JSON object containing the retrieved data is sent to the client.
   return res.status(200).json({ data: result });
};

export const retrieve: RequestHandler = async (req, res) => {
   const id: number = +req.params.id;

   const result = await ticketController.retrieve(id);

   return res.status(200).send(result);
};

// This exports a named `update` function of type `RequestHandler`
export const update: RequestHandler = async (req, res, next) => {
   // Extract the `id` from the request parameters and convert it to a number
   const id: number = +req.params.id;
   // Extract the fields to be updated from the request body
   const fields = req.body;

   // Call the `ticketController.update` method with the `id` and `fields`
   const result = await ticketController.update(id, fields);

   // Send a success response with the updated ticket data
   return res.status(200).json({ success: true, data: result });
};
