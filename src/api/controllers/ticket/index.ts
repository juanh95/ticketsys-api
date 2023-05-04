import { Ticket } from "../../interfaces/index";
import { CreateTicketDTO } from "../../dto/ticket.dto";
import * as mapper from "./mapper";
import * as service from "../../services/ticketService";

export const create = async (payload: CreateTicketDTO): Promise<Ticket> => {
   return mapper.toTicket(await service.create(payload));
};

export const listReported = async (
   id: number,
   status: string
): Promise<Ticket[]> => {
   const result = await service.list(id, status);
   let formattedResult: Ticket[] = [];

   result.forEach((ticket) => {
      formattedResult.push(mapper.toTicket(ticket));
   });

   return formattedResult;
};
