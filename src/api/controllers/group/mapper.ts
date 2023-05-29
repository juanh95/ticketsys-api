import { Group } from "../../interfaces/group.interface";
import { GroupOutput } from "../../../database/models/Group";

export const toGroup = (group: GroupOutput): Group => {
   return {
      id: group.id,
      name: group.name,
      description: group.description,
      ownerId: group.ownerId,
   };
};
