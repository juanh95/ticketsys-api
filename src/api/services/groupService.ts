import { GroupInput, GroupOutput } from "../../database/models/Group";
import * as groupDal from "../../database/dal/group";

/**
 * Create a new group with the provided owner ID and payload.
 *
 * @param id - The ID of the owner creating the group
 * @param payload - The data for creating the group
 * @returns A Promise that resolves to the created group
 */
export const create = async (
   id: number,
   payload: GroupInput
): Promise<GroupOutput> => {
   // Call the group data access layer (DAL) to create the group with the given owner ID and payload
   const createdGroup = await groupDal.create(id, payload);

   // Return the created group
   return createdGroup;
};
