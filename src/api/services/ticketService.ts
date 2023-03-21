import { TicketInput, TicketOutput } from "../../database/models/Ticket";
import * as ticketDal from "../../database/dal/ticket";

export const create = async (payload: TicketInput): Promise<TicketOutput> => {
  return ticketDal.create(payload);
};

export const list = async (
  id: number,
  option: string
): Promise<TicketOutput[]> => {
  return ticketDal.list(id, option);
};
