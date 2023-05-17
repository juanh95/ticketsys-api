import { RequestHandler } from "express";
import { CreateCommentDTO } from "../../dto/comment.dto";
import * as commentController from "../../controllers/comment/index";

// The following function is called `create` and it is of type RequestHandler.
// It takes in the HTTP request object, response object, and next middleware function as arguments.
export const create: RequestHandler = async (req, res, next) => {
   try {
      // The `CreateCommentDTO` type assertion is used to cast the request payload to the expected structure.
      const payload: CreateCommentDTO = req.body;

      // The `create` function on the `commentController` object is called with the extracted payload as an argument.
      const result = await commentController.create(payload);

      // A success response with a status code of 200 and the created comment object is sent to the client.
      res.status(200).send(result);
   } catch (error) {
      // If an error occurs during creation of the comment, a failure response with a status code of 500 and a JSON error message is sent to the client.
      res.status(500).json({ msg: "Unable to add comment" });
   }
};
