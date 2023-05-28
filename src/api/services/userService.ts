import { User } from "../../database/models/User";
import { UserInput, UserOutput } from "../../database/models/User";
import * as userDal from "../../database/dal/user";

/**
 * Create a new user based on the provided payload.
 * @param payload - The user input data for creating a new user.
 * @returns A promise that resolves to a UserOutput object representing the created user.
 */
export const create = async (payload: UserInput): Promise<UserOutput> => {
   // Call the create method from userDal with the provided payload to create a new user
   return userDal.create(payload);
};

/**
 * Retrieve a user based on the provided payload.
 * @param payload - The payload used to identify the user.
 * @returns A promise that resolves to a UserOutput object or null if not found.
 */
export const retrieve = async (payload: string): Promise<UserOutput | null> => {
   // Call the retrieve method from userDal with the provided payload to retrieve the user
   return await userDal.retrieve(payload);
};

/**
 * Retrieve a list of users based on the provided parameters.
 * @param params - An array of string parameters for filtering the users.
 * @returns A promise that resolves to an array of UserOutput objects.
 */
export const list = async (...params: string[]): Promise<UserOutput[]> => {
   // Destructure the parameters array to retrieve email and department
   const [all = null, email = null, department = null] = params;

   // Initialize an empty whereClause object for filtering
   const whereClause: any = {};

   // Check if email parameter is provided and add it to the whereClause
   if (email) {
      whereClause.email = email;
   }

   // Check if department parameter is provided and add it to the whereClause
   if (department) {
      whereClause.department = department;
   }

   if (all) {
      whereClause.all = all;
   }

   // Call the list method from userDal with the whereClause to retrieve the list of users
   return userDal.list(whereClause);
};

/**
 * Updates a user record in the database.
 *
 * @param id - The ID of the user record to be updated.
 * @param fields - An object containing the fields and their updated values for the user record.
 * @returns A promise that resolves to a `UserOutput` object representing the updated user record.
 */
export const update = async (id: number, fields: any): Promise<UserOutput> => {
   return userDal.update(id, fields);
};
