import { Ticket } from "../../interfaces/index";
import { CreateTicketDTO } from "../../dto/ticket.dto";
import * as mapper from "./mapper";
import * as service from "../../services/ticketService";

export const create = async (payload: CreateTicketDTO): Promise<Ticket> => {
   return mapper.toTicket(await service.create(payload));
};

export const listReported = async (...params: any[]): Promise<Ticket[]> => {
   const result = await service.list(...params);
   const formattedResult: Ticket[] = result.map((ticket) =>
      mapper.toTicket(ticket)
   );
   return formattedResult;
};
