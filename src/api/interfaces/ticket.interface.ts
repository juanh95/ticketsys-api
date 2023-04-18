export interface Ticket {
  id?: number;
  status: string;
  description: string;
  reportedId: number;
  affectedId: number;
  assignedId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  priority: string;
  category: string;
  title: string;
  affectedItem: string;
  phone: string;
}
