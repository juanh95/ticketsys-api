import { User, UserInput, UserOutput } from "../models/User";
import { Op, UpdateOptions } from "sequelize";
import * as util from "../../crypto/utils";
import { ServerError } from "../../lib/ServerError";

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
   if (whereClause.all) {
      const result = await User.findAll();
      return result;
   }

   // The pattern %${whereClause.department}% is used to match any value that contains the specified "department" value.
   // The % sign acts as a wildcard, allowing for matching any characters before and after the "department" value.
   const result = await User.findAll({
      where: {
         department: {
            [Op.like]: `%${whereClause.department}%`,
         },
      },
   });

   // Return the retrieved list of users
   return result;
};

/**
 * Updates a user with the specified ID using the given fields.
 *
 * @param id - The ID of the user to update.
 * @param fields - The fields to update for the user.
 * @returns The updated user.
 * @throws {ServerError} If no fields were updated or if the user could not be found.
 */
export const update = async (id: number, fields: any): Promise<UserOutput> => {
   // Prepare the options for the update operation
   const updateOptions: UpdateOptions = {
      where: { id: id },
   };

   // Perform the update operation
   const updates = await User.update(fields, updateOptions);

   // Check if any fields were updated
   if (updates[0] === 0) {
      throw new ServerError("No fields were updated", 500);
   }

   // Retrieve the updated user
   const updatedUser = await User.findByPk(id);

   // Check if the user exists
   if (!updatedUser) {
      throw new ServerError("Unable to find user", 404);
   }

   return updatedUser;
};
