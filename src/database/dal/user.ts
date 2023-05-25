import { User, UserInput, UserOutput } from "../models/User";
import { Op } from "sequelize";
import * as util from "../../crypto/utils";

/**
 * Create a new user based on the provided payload.
 * @param payload - The user input data for creating a new user.
 * @returns A promise that resolves to a UserOutput object representing the created user.
 */
export const create = async (payload: UserInput): Promise<UserOutput> => {
   // Generate a salt and hash the password using utility functions
   payload.salt = await util.genSalt();
   payload.pwd = await util.genHash(payload.pwd, payload.salt);

   // Use the User model to create a new user with the provided payload
   const user = await User.create(payload);

   // Return the created user
   return user;
};

/**
 * Retrieve a user based on the provided email payload.
 * @param payload - The email used to identify the user.
 * @returns A promise that resolves to a UserOutput object or null if not found.
 */
export const retrieve = async (payload: string): Promise<UserOutput | null> => {
   // Use the User model to find a user with the specified email
   const result = await User.findOne({ where: { email: payload } });

   // Return the retrieved user or null if not found
   return result;
};

//TODO: implement search by email
/**
 * Retrieve a list of users based on the provided 'whereClause' filter.
 * @param whereClause - An object specifying the filtering criteria.
 * @returns A promise that resolves to an array of UserOutput objects.
 */
export const list = async (whereClause: any): Promise<UserOutput[]> => {
   // Use the User model to find all users based on the provided filter
   let result = await User.findAll({
      where: {
         department: {
            [Op.like]: `%${whereClause.department}%`,
         },
      },
   });

   // Return the retrieved list of users
   return result;
};
