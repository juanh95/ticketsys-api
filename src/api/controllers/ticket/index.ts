import { Ticket } from "../../interfaces/index";
import { CreateTicketDTO } from "../../dto/ticket.dto";
import * as mapper from "./mapper";
import * as service from "../../services/ticketService";

export const create = async (payload: CreateTicketDTO): Promise<Ticket> => {
   return mapper.toTicket(await service.create(payload));
};

// This function exports a method of type `async`. It takes in rest parameters called `params` and returns a `Promise` of type `Ticket[]`.
export const listReported = async (...params: any[]): Promise<Ticket[]> => {
   // `list` method is called on the `service` object with `params` as arguments, and the result is stored in `result`.
   const result = await service.list(...params);

   // The `map` method is used for mapping the properties of each ticket in `result` to a new object using the `toTicket()` method from `mapper`. The result of this mapping is stored in `formattedResult`.
   const formattedResult: Ticket[] = result.map((ticket) =>
      mapper.toTicket(ticket)
   );

   // Finally, the formatted results are returned.
   return formattedResult;
};
