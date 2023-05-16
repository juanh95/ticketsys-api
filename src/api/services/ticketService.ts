import { TicketInput, TicketOutput } from "../../database/models/Ticket";
import * as ticketDal from "../../database/dal/ticket";

export const create = async (payload: TicketInput): Promise<TicketOutput> => {
   return ticketDal.create(payload);
};

export const list = async (...params: any[]): Promise<TicketOutput[]> => {
   const [id = null, status = null, category = null, priority = null] = params;

   console.log(params);

   const whereClause: any = {};

   if (id) {
      whereClause.id = id;
   }

   if (status) {
      whereClause.status = status;
   }

   if (priority) {
      whereClause.priority = priority;
   }

   if (category) {
      whereClause.category = category;
   }

   console.log(whereClause);

   return ticketDal.list(whereClause);
};
