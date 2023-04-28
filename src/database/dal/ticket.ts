import { Ticket, TicketInput, TicketOutput } from "../models/Ticket";

export const create = async (payload: TicketInput): Promise<TicketOutput> => {
  const ticket = await Ticket.create(payload);

  return ticket;
};

export const list = async (
  id: number,
  option: string
): Promise<TicketOutput[]> => {
  let result: Ticket[] = [];

  switch (option) {
    case "reported":
      result = await Ticket.findAll({
        where: { reportedId: id },
      });
      break;
    case "affected":
      result = await Ticket.findAll({
        where: { affectedId: id },
      });
      break;
    case "assigned":
      result = await Ticket.findAll({
        where: { assignedId: id },
      });
      break;
    case "all":
      result = await Ticket.findAll();
      break;
  }

  return result;
};
