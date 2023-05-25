import { User } from "../../database/models/User";
import { UserInput, UserOutput } from "../../database/models/User";
import * as userDal from "../../database/dal/user";

export const create = async (payload: UserInput): Promise<UserOutput> => {
   return userDal.create(payload);
};

export const retrieve = async (payload: string): Promise<UserOutput | null> => {
   return await userDal.retrieve(payload);
};

export const list = async (...params: string[]): Promise<UserOutput[]> => {
   const [email = null, department = null] = params;

   const whereClause: any = {};

   if (email) {
      whereClause.email = email;
   }
   if (department) {
      whereClause.department = department;
   }

   return userDal.list(whereClause);
};
