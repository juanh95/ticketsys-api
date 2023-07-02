import { Ticket } from "../../interfaces/index";
import { CreateTicketDTO } from "../../dto/ticket.dto";
import * as mapper from "./mapper";
import * as service from "../../services/ticketService";

export const create = async (payload: CreateTicketDTO): Promise<Ticket> => {
   console.log("Made it to the controller");
   return mapper.toTicket(await service.create(payload));
};

// This function exports a method of type `async`. It takes in rest parameters called `params` and returns a `Promise` of type `Ticket[]`.
export const list = async (...params: any[]): Promise<Ticket[]> => {
   // `list` method is called on the `service` object with `params` as arguments, and the result is stored in `result`.
   const result = await service.list(...params);

   // The `map` method is used for mapping the properties of each ticket in `result` to a new object using the `toTicket()` method from `mapper`. The result of this mapping is stored in `formattedResult`.
   const formattedResult: Ticket[] = result.map((ticket) =>
      mapper.toTicket(ticket)
   );

   // Finally, the formatted results are returned.
   return formattedResult;
};

export const retrieve = async (id: number): Promise<Ticket> => {
   const result = mapper.toTicket(await service.retrieve(id));

   return result;
};

// Defines a function named `update` that is exported as a constant, which takes in an array of variable arguments (of any type) and returns a Promise object that resolves to a Ticket object.
export const update = async (id: number, fields: any): Promise<Ticket> => {
   // Declares a constant variable named `result`, which is assigned the value returned by invoking the `mapper.toTicket()` function with the result of invoking the `service.update()` function with the provided fields.
   const result = mapper.toTicket(await service.update(id, fields));

   // Returns the `result` constant variable.
   return result;
};
