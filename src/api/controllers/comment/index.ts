import { Comment } from "../../interfaces/index";
import { CreateCommentDTO } from "../../dto/comment.dto";
import * as mapper from "./mapper";
import * as service from "../../services/commentService";

// This function exports a method of type `async`. It takes in an object called `payload` of type `CreateCommentDTO`.
export const create = async (payload: CreateCommentDTO): Promise<Comment> => {
   // The `create` method on the `service` object is called with the payload as an argument, and the result is awaited.
   const serviceResult = await service.create(payload);

   // The `toComment` method on the `mapper` object is called to map the service result to a `Comment` object.
   const commentResult = mapper.toComment(serviceResult);

   // The `Comment` object is returned to any calling code.
   return commentResult;
};
