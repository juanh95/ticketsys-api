import { RequestHandler } from "express";
import { User } from "../../../database/models/User";
import * as utils from "../../../crypto/utils";
import { CreateUserDTO } from "../../dto/user.dto";
import * as userController from "../../controllers/user/index";

export const create: RequestHandler = async (req, res, next) => {
   try {
      const payload: CreateUserDTO = req.body;
      const exists = await userController.retrieve(payload.email);
      if (!exists) {
         const result = await userController.create(payload);
         const jwt = utils.issueJWT(result);
         res.status(200).json({ user: result, tokenInfo: jwt });
      } else {
         res.status(409).json({ success: false, msg: "Email already exists" });
      }
   } catch (error) {
      res.status(500).json({ message: "Failed to create user" });
   }
};

export const login: RequestHandler = async (req, res, next) => {
   try {
      const user = await userController.retrieve(req.body.email);

      if (!user) {
         return res
            .status(404)
            .json({ message: "User with that email was not found" });
      }

      const match = await utils.validPassword(req.body.pwd, user.pwd);

      if (match) {
         const jwt = utils.issueJWT(user);

         return res.status(200).json({
            success: true,
            token: jwt.token,
            expiresIn: jwt.expires,
            user: user.firstName,
         });
      } else {
         return res
            .status(401)
            .json({ success: false, message: "Invalid credentials" });
      }
   } catch (error) {
      return res
         .status(500)
         .json({ message: "Unable to process user login", error: error });
   }
};

// TODO: Needs to have the ability to retrieve a another user by id as well
export const retrieve: RequestHandler = async (req, res, next) => {
   try {
      const user: User = req.user as User;

      if (user == null) {
         return res.status(404).json({ message: "User not found!" });
      }

      return res.status(200).json({ success: true, data: user });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Unable to retrieve user!" });
   }
};

export const list: RequestHandler = async (req, res, next) => {
   const { all, email, department } = req.query;

   const result = await userController.list(all, email, department);

   return res.status(200).json({ data: result });
};

// export const deleteUser: RequestHandler = async (req, res, next) => {
//   try {
//     const deletedUserCount: number = await User.destroy({
//       where: { id: req.params.id },
//     });

//     if (deletedUserCount == 0) {
//       return res.status(404).json({ message: "User could not be found" });
//     }

//     return res.status(200).json({ message: "User has been deleted" });
//   } catch (error) {
//     return res.status(500).json({ message: "User could not be deleted" });
//   }
// };

// // TODO: Need to only get the data that we need to update
// export const updateUser: RequestHandler = async (req, res, next) => {
//   const userInfo = {
//     id: req.body.id,
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     phone: req.body.phone,
//     email: req.body.email,
//     department: req.body.department,
//   };

//   try {
//     const arr = await User.update(
//       {
//         firstName: userInfo.firstname,
//         lastName: userInfo.lastname,
//         phone: userInfo.phone,
//         email: userInfo.email,
//         department: userInfo.department,
//       },
//       {
//         where: { id: userInfo.id },
//       }
//     );

//     return res.status(200).json({
//       message: "User information was updated",
//     });
//   } catch (error) {
//     return res.status(500).json({ message: "Unable to update user" });
//   }
// };
