import { Group } from "./group.interface";
export interface User {
   id?: number;
   firstName: string;
   lastName: string;
   email?: string;
   department?: string;
   phone?: string;
   pwd: string;
   salt: string;
   groups?: Group[];
   createdAt?: Date;
   updatedAt?: Date;
   deletedAt?: Date;
}
