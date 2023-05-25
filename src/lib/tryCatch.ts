import { NextFunction, Request, RequestHandler, Response } from "express";

/*
   The provided code defines a higher-order function called tryCatch that acts as middleware to 
   handle errors in Express route handlers. It takes a route handler function as an argument and 
   returns a new middleware function. When executed, the middleware function invokes the route 
   handler within a try-catch block. If an error occurs, it is passed to the next function for 
   error handling middleware. This encapsulates error handling logic and promotes code reuse.
*/

export const tryCatch =
   (controller: RequestHandler) =>
   async (req: Request, res: Response, next: NextFunction) => {
      try {
         await controller(req, res, next);
      } catch (error) {
         return next(error);
      }
   };
