import { RequestHandler } from "express";
import { CreateCommentDTO } from "../../dto/comment.dto";
import * as commentController from "../../controllers/comment/index";
import { User } from "../../interfaces";

/**
 * Creates a new comment.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 * @returns A response indicating the success or failure of the comment creation.
 */
export const create: RequestHandler = async (req, res, next) => {
   // Try to create the comment.
   try {
      // Get the user data from the request.
      const userData: User = req.user as User;

      if (!req.body.commentBody) {
         return res
            .status(400)
            .json({ msg: "Comment body is missing or empty" });
      }

      // Add the user's ID to the request body, so that the comment can be associated with the correct user.
      req.body.userId = userData.id;

      // Create a new `CreateCommentDTO` object from the request body.
      const payload: CreateCommentDTO = req.body;

      // Call the commentController.create() function to create the comment.
      const result = await commentController.create(payload);

      // Send the result back to the client with a status code of 200, indicating that the comment was created successfully.
      return res.status(200).send(result);

      // Catch any errors that occur and send a generic error message back to the client with a status code of 500.
   } catch (error) {
      return res.status(500).json({ msg: "Unable to add comment" });
   }
};
