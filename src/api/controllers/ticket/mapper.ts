import { Ticket } from "../../interfaces";
import { Comment } from "../../interfaces/";
import { TicketOutput } from "../../../database/models/Ticket";

export const toTicket = (ticket: TicketOutput): Ticket => {
   return {
      id: ticket.id,
      status: ticket.status,
      description: ticket.description,
      reportedId: ticket.reportedId,
      affectedId: ticket.affectedId,
      assignedId: ticket.assignedId,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
      deletedAt: ticket.deletedAt,
      priority: ticket.priority,
      category: ticket.category,
      affectedItem: ticket.affectedItem,
      title: ticket.title,
      phone: ticket.phone,
      comments: ticket.comments,
   };
};
