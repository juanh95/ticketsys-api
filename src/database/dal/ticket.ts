import { Ticket, TicketInput, TicketOutput } from "../models/Ticket";
import { UpdateOptions } from "sequelize";
import { ServerError } from "../../lib/ServerError";

export const create = async (payload: TicketInput): Promise<TicketOutput> => {
   console.log("Made to the DAL, next function calls create");
   console.log(payload);

   const ticket = await Ticket.create(payload);
   console.log("Past the create line");

   if (ticket === null) {
      const err = new ServerError("Unable to Create Record in MySQL", 500);
      err.name = "Record Error";
      throw err;
   }

   return ticket;
};

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
      const err = new ServerError("No Ticket Found with ID: " + id, 404);
      err.name = "Invalid ID";

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
      const err = new ServerError("No Ticket Found with ID: " + id, 404);
      err.name = "Invalid ID";
      throw err;
   }

   const ticket = await Ticket.findByPk(id);

   if (ticket === null) {
      const err = new ServerError("No Ticket Found with ID: " + id, 404);
      err.name = "Invalid ID";
      throw err;
   }

   return ticket;
};
