import { Ticket, TicketInput, TicketOutput } from "../models/Ticket";
import { Op } from "sequelize";

export const create = async (payload: TicketInput): Promise<TicketOutput> => {
   const ticket = await Ticket.create(payload);

   return ticket;
};

import { UpdateOptions } from "sequelize";

//Might Need to Specify list and retrieve
export const list = async (whereClause: any): Promise<TicketOutput[]> => {
   let result: Ticket[] = [];

   if (whereClause.id) {
      result = await Ticket.findAll({
         where: whereClause,
         include: "comments",
      });
   } else {
      result = await Ticket.findAll({
         where: whereClause,
      });
   }

   return result;
};

export const retrieve = async (id: number): Promise<TicketOutput> => {
   const ticket = await Ticket.findByPk(id);

   if (ticket === null) {
      const err = new Error("No Ticket Found with ID: " + id);
      console.log(err);
      throw err;
   }

   return ticket;
};

export const update = async (id: number, fields: any): Promise<any> => {
   const updateOptions: UpdateOptions = {
      where: { id: id },
   };

   const updatedTicket = await Ticket.update(fields, updateOptions);

   if (updatedTicket[0] === 0) {
      const err = new Error("No Ticket Found with ID: " + id);
      console.log(err);
      throw err;
   }

   const ticket = await Ticket.findByPk(id);

   if (ticket === null) {
      const err = new Error("No Ticket Found with ID: " + id);
      console.log(err);
      throw err;
   }

   return ticket;
};
