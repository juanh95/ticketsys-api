import { ErrorRequestHandler } from "express";
import { ServerError } from "./ServerError";

/*
   This middleware handles errors during request processing by checking if the error is a ServerError. 
   If so, it sends a response with the error message and appropriate status code. Otherwise, it sends 
   a generic error response with a 500 status code. This middleware improves error handling in the application.
*/

// Error is also picking up cases where the correct route is not found

// Define an error handling middleware named errorHandler
export const errorHandler: ErrorRequestHandler = (
   error: ServerError,
   req,
   res
) => {
   // Check if the error is an instance of ServerError
   console.log("Inside the error handler");
   if (error instanceof ServerError) {
      // If so, send a response with the error message and status code
      return res.status(error.statusCode).send(error.message);
   }

   // If the error is not an instance of ServerError, send a generic error response with a 500 status code
   return res.status(500).send("Server Came Across an Error");
};
