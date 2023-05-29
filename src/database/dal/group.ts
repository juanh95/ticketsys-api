import { Group, GroupInput, GroupOutput } from "../models/Group";
import { ServerError } from "../../lib/ServerError";
import { User } from "../models/User";

/**
 * Create a new group with the provided owner ID and payload.
 *
 * @param id - The ID of the owner creating the group
 * @param payload - The data for creating the group
 * @returns A Promise that resolves to the created group
 * @throws {ServerError} If there is an error creating the group or finding the user
 */
export const create = async (
   id: number,
   payload: GroupInput
): Promise<GroupOutput> => {
   // Create a new group with the provided payload
   const group = await Group.create(payload);

   // Check if the group creation was successful
   if (group === null) {
      // Throw an error if the group creation failed
      const err = new ServerError(
         "Unable to Create Record in MySQL Database",
         500
      );
      err.name = "Record Error";
      throw err;
   }

   // Find the user with the provided ID
   const user = await User.findByPk(id);

   // Check if the user exists
   if (user === null) {
      // Throw an error if the user was not found
      const err = new ServerError("Unable to find User", 404);
      err.name = "User Not Found";
      throw err;
   }

   // Associate the user as the owner of the group
   await group.$set("owner", user);

   // Add the user as a member of the group
   await group.$add("members", user);

   // Return the created group
   return group;
};
