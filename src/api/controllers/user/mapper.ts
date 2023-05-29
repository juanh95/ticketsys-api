import { User } from "../../interfaces/index";
import { UserOutput } from "../../../database/models/User";

export const toUser = (user: UserOutput): User => {
   return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      department: user.department,
      phone: user.phone,
      pwd: user.pwd,
      salt: user.salt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
   };
};
