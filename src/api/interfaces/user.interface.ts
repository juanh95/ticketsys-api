export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email?: string;
  department?: string;
  phone?: string;
  pwd: string;
  salt: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
