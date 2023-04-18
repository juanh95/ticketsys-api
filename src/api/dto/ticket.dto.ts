export type CreateTicketDTO = {
  status: string;
  description: string;
  reportedId: number;
  affectedId: number;
  assignedId: number;
  title: string;
  priority: string;
  category: string;
  affectedItem: string;
  phone: string;
};
