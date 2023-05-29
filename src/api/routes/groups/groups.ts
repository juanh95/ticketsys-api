import { RequestHandler } from "express";
import { CreateGroupDTO } from "../../dto/group.dto";
import { User } from "../../interfaces";
import * as groupController from "../../controllers/group/index";
import { ServerError } from "../../../lib/ServerError";

/**
 * Create a new group.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 * @throws {ServerError} - If user ID is not found or user is not signed in
 * @returns Response with the created group
 */
export const create: RequestHandler = async (req, res, next) => {
   // Extract the payload from the request body
   const payload: CreateGroupDTO = req.body;

   // Get the user from the request object
   const user: User = req.user as User;

   if (user) {
      if (user.id) {
         // Extract the user ID
         const id: number = +user.id;

         // Call the groupController to create the group
         const result = await groupController.create(id, payload);

         // Return the created group as JSON response
         return res.status(200).json(result);
      } else {
         // Throw an error if the user ID is not found
         const err = new ServerError("User ID was not found", 404);
         err.name = "User Not Found";
         throw err;
      }
   } else {
      // Throw an error if the user is not signed in
      const err = new ServerError("You need to sign in to create a group", 404);
      err.name = "User Not Signed in";
      throw err;
   }
};
