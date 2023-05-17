import { Comment, CommentInput, CommentOutput } from "../models/Comment";

export const create = async (payload: CommentInput): Promise<CommentOutput> => {
   const comment = await Comment.create(payload);

   return comment;
};
