import { TicketInput, TicketOutput } from "../../database/models/Ticket";
import * as ticketDal from "../../database/dal/ticket";

export const create = async (payload: TicketInput): Promise<TicketOutput> => {
   console.log("Made it to the service");
   return ticketDal.create(payload);
};

export const list = async (...params: any[]): Promise<TicketOutput[]> => {
   const [id = null, status = null, category = null, priority = null] = params;

   const whereClause: any = {};

   // If we're looking for a ticket with a specific ID, no need to include the other fields
   if (id) {
      whereClause.id = id;
   } else {
      if (status) {
         whereClause.status = status;
      }

      if (priority) {
         whereClause.priority = priority;
      }

      if (category) {
         whereClause.category = category;
      }
   }

   return ticketDal.list(whereClause);
};

export const retrieve = async (id: number): Promise<TicketOutput> => {
   return ticketDal.retrieve(id);
};

// TODO: Need to be able to update the users related to the ticket
export const update = async (
   id: number,
   fields: any
): Promise<TicketOutput> => {
   return ticketDal.update(id, fields);
};
