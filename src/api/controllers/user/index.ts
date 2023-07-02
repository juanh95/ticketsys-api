import { User } from "../../interfaces/index";
import { CreateUserDTO } from "../../dto/user.dto";
import * as mapper from "./mapper";
import * as service from "../../services/userService";
import { UserOutput } from "../../../database/models/User";
import { ServerError } from "../../../lib/ServerError";

/**
 * Create a new user using the provided payload.
 * @param payload - The data needed to create a new user.
 * @returns The created user object.
 */
export const create = async (payload: CreateUserDTO): Promise<User> => {
   // Call the service's create method to create a new user using the payload
   const createdUser = await service.create(payload);

   // Map the created user to the User model using the mapper's toUser method
   return mapper.toUser(createdUser);
};

/**
 * Retrieve a user based on the provided payload.
 * @param payload - The identifier or unique information to retrieve a user.
 * @returns The retrieved user object.
 * @throws ServerError if the user is not found.
 */
export const retrieve = async (
   payload: string,
   check?: boolean
): Promise<User | null> => {
   // Call the service's retrieve method to retrieve the user using the payload
   const result = await service.retrieve(payload);

   // If there was no user entry and we're not just checking, return server error
   if (!result && !check) {
      throw new ServerError("User was not found", 404);
   }

   if (!result && check) {
      return null;
   }

   if (!result) {
      throw new ServerError("User retrival service failed", 500);
   }

   // Map the retrieved user to the User model using the mapper's toUser method
   return mapper.toUser(result);
};

/**
 * Retrieve a list of users based on the provided parameters.
 * @param params - The parameters used to filter and paginate the user list.
 * @returns A list of users matching the specified criteria.
 */
export const list = async (...params: any[]): Promise<User[]> => {
   // Call the service's list method to retrieve the list of users using the provided parameters
   const result = await service.list(...params);

   // Map the result to the User model using the mapper's toUser method
   const formattedResult: User[] = result.map((user) => mapper.toUser(user));

   // Return the formatted result
   return formattedResult;
};

/**
 * Update a user with the specified ID using the provided fields.
 * @param id - The ID of the user to update.
 * @param fields - The fields to update in the user.
 * @returns The updated user object.
 */
export const update = async (id: number, fields: any): Promise<User> => {
   // Call the service's update method to update the user with the specified ID and fields
   const updatedUser = await service.update(id, fields);

   // Map the updated user to the User model using the mapper's toUser method
   return mapper.toUser(updatedUser);
};
