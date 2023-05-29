import { CreateGroupDTO } from "../../dto/group.dto";
import { Group } from "../../interfaces/group.interface";
import * as mapper from "./mapper";
import * as service from "../../services/groupService";

/**
 * Create a new group using the provided user ID and payload.
 *
 * @param id - The ID of the user creating the group
 * @param payload - The data for creating the group
 * @returns A Promise that resolves to the created group
 */
export const create = async (
   id: number,
   payload: CreateGroupDTO
): Promise<Group> => {
   // Call the service to create the group with the given user ID and payload
   const createdGroup = await service.create(id, payload);

   // Map the created group to the Group model using the mapper
   const group = mapper.toGroup(createdGroup);

   // Return the created group
   return group;
};
