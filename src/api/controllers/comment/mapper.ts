import { Comment } from "../../interfaces";
import { CommentOutput } from "../../../database/models/Comment";

export const toComment = (comment: CommentOutput): Comment => {
   return {
      id: comment.id,
      ticketId: comment.ticketId,
      userId: comment.userId,
      commentBody: comment.commentBody,
      createdAt: comment.createdAt,
   };
};
