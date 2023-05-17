import { CommentInput, CommentOutput } from "../../database/models/Comment";
import * as commentDal from "../../database/dal/comment";

// This function exports a method of type `async`. It takes in an object called `payload` of type `CommentInput`.
export const create = async (payload: CommentInput): Promise<CommentOutput> => {
   // The method calls the `create` method on the `commentDal` object with the payload as an argument, and returns the result.
   return commentDal.create(payload);
};
