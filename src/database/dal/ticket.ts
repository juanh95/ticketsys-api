import { Ticket, TicketInput, TicketOutput } from "../models/Ticket";
import { UpdateOptions } from "sequelize";
import { ServerError } from "../../lib/ServerError";

/**
 * Creates a new ticket.
 *
 * @param payload The ticket payload.
 *
 * @returns The created ticket.
 */
export const create = async (payload: TicketInput): Promise<TicketOutput> => {
   // Create a new ticket.
   const ticket = await Ticket.create(payload);

   // If the ticket is null, throw an error.
   if (ticket === null) {
      const err = new ServerError("Unable to Create Record in MySQL", 500);
      err.name = "Record Error";
      throw err;
   }

   // Return the created ticket.
   return ticket;
};

//Might Need to Specify list and retrieve
/**
 * Lists all tickets.
 *
 * @param whereClause The where clause to use to filter the results.
 * @param page The page number.
 * @param limit The number of tickets to return per page.
 *
 * @returns An object containing the following properties:
 *   * tickets: An array of the queried tickets.
 *   * currentPage: The current page number (optional).
 *   * totalPages: The total number of pages (optional).
 *   * totalTickets: The total number of tickets (optional).
 */
export const list = async (
   whereClause: any,
   page: number,
   limit: number
): Promise<{
   tickets: TicketOutput[];
   currentPage?: number;
   totalPages?: number;
   totalTickets?: number;
}> => {
   // Get the total number of tickets.
   const totalTickets = await Ticket.count();

   // Calculate the offset for the current page.
   const offset = (page - 1) * limit;

   // Calculate the total number of pages.
   const totalPages = Math.ceil(totalTickets / limit);

   // Query the tickets.
   let tickets: Ticket[] = [];

   if (whereClause.id) {
      tickets = await Ticket.findAll({
         where: whereClause,
         include: "comments",
      });
   } else {
      tickets = await Ticket.findAll({
         where: whereClause,
         limit: limit,
         offset: offset,
      });
   }

   // Return the results.
   return {
      tickets,
      currentPage: page, // The current page number (optional).
      totalPages, // The total number of pages (optional).
      totalTickets, // The total number of tickets (optional).
   };
};

export const retrieve = async (id: number): Promise<TicketOutput> => {
   const ticket = await Ticket.findByPk(id, { include: "comments" });

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
