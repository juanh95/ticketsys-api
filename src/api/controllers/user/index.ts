import { User } from "../../interfaces/index";
import { CreateUserDTO } from "../../dto/user.dto";
import * as mapper from "./mapper";
import * as service from "../../services/userService";

export const create = async (payload: CreateUserDTO): Promise<User> => {
  console.log("got to the controller");
  return mapper.toUser(await service.create(payload));
};

// export const listUsers: RequestHandler = async (req, res, next) => {
//   const usersList: User[] = await User.findAll();

//   return res
//     .status(200)
//     .json({ message: "Users fetched successfully", data: usersList });
// };

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

// export const retrieveUser: RequestHandler = async (req, res, next) => {
//   try {
//     const user: User = req.user as User;

//     if (user == null) {
//       return res.status(404).json({ message: "User not found!" });
//     }

//     return res.status(200).json({ message: "User found!", data: user });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Unable to retrieve user!" });
//   }
// };

// export const loginUser: RequestHandler = async (req, res, next) => {
//   try {
//     const userInfo = await User.findOne({ where: { email: req.body.email } });

//     if (userInfo == null) {
//       return res
//         .status(404)
//         .json({ message: "User with that email was not found" });
//     }

//     const match = await utils.validPassword(req.body.password, userInfo.pwd);

//     if (match) {
//       const jwt = utils.issueJWT(userInfo);

//       return res.status(200).json({
//         success: true,
//         token: jwt.token,
//         expiresIn: jwt.expires,
//       });
//     } else {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid credentials" });
//     }
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Unable to process user login", error: error });
//   }
// };
