import { Request, Response, NextFunction } from "express";
import { Group } from "../database/models/Group";
import { User } from "../database/models/User";

export const checkGroupMembership = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const userId = (req.user as User).id; // Assuming the authenticated user's ID is stored in req.user.id
   // const groupId = req.params.groupId; // Assuming the group ID is extracted from the request parameters
   const groupId = 1;

   try {
      const group = await Group.findByPk(groupId);

      if (!group) {
         // If the group doesn't exist, return an error
         return res.status(404).json({ error: "Group not found" });
      }

      const user = await User.findByPk(userId);

      if (!user) {
         // If the user doesn't exist, return an error
         return res.status(404).json({ error: "User not found" });
      }

      // const isMember = await group.hasMember(user);
      const isMember = await group.$has("members", user);

      if (!isMember) {
         // If the user is not a member of the group, return an error
         return res
            .status(403)
            .json({ error: "User is not a member of the group" });
      }

      // If the user is a member of the group, proceed to the next middleware or route handler
      next();
   } catch (error) {
      // Handle any errors that occurred during the verification process
      console.error("Error checking group membership:", error);
      res.status(500).json({ error: "Internal server error" });
   }
};
