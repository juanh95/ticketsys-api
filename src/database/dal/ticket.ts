import { Ticket, TicketInput, TicketOutput } from "../models/Ticket";
import { Op } from "sequelize";

export const create = async (payload: TicketInput): Promise<TicketOutput> => {
   const ticket = await Ticket.create(payload);

   return ticket;
};

// export const list = async (...params: any[]): Promise<TicketOutput[]> => {
//    let result: Ticket[] = [];

//    switch (status) {
//       case "open":
//          result = await Ticket.findAll({
//             where: { status: "Open", },
//          });
//          break;
//       case "closed":
//          result = await Ticket.findAll({
//             where: { status: "Closed" },
//          });
//          break;
//       case "in-progress":
//          result = await Ticket.findAll({
//             where: { status: "In Progress" },
//          });
//          break;
//       case "new":
//          result = await Ticket.findAll({
//             where: { status: "New" },
//          });
//          break;
//       default:
//          result = await Ticket.findAll();
//          break;
//    }

//    return result;
// };

export const list = async (whereClause: any): Promise<TicketOutput[]> => {
   let result: Ticket[] = [];

   result = await Ticket.findAll({
      where: whereClause,
   });

   return result;
};
