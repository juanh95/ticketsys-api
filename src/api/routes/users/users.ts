import { RequestHandler } from "express";
import { User } from "../../../database/models/User";
import * as utils from "../../../crypto/utils";
import { CreateUserDTO } from "../../dto/user.dto";
import * as userController from "../../controllers/user/index";
import { UpdateOptions, where } from "sequelize";
import * as mapper from "../../controllers/user/mapper";
import { ServerError } from "../../../lib/ServerError";
import { tryCatch } from "../../../lib/tryCatch";

/**
 * Handles the creation of a new user.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 * @returns A response indicating the success or failure of the user creation.
 */
export const create: RequestHandler = async (req, res, next) => {
   // Extract the payload from the request body
   const payload: CreateUserDTO = req.body;

   // Check if a user with the same email already exists
   const exists = await userController.retrieve(payload.email, true);

   if (!exists) {
      // Create a new user if no existing user with the same email is found
      const result = await userController.create(payload);

      // Generate a JWT token for the created user
      const jwt = utils.issueJWT(result);

      return res.status(200).json({ user: result, tokenInfo: jwt });
   } else {
      // Return an error response if a user with the same email already exists
      return res
         .status(409)
         .json({ success: false, msg: "Email already exists" });
   }
};

/**
 * Handles the login functionality.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 * @returns A response indicating the success or failure of the login attempt.
 */
export const login: RequestHandler = async (req, res, next) => {
   // Retrieve the user based on the provided email
   const user = await userController.retrieve(req.body.email);

   if (!user) {
      throw new ServerError("User was not found", 404);
   }

   // Validate the provided password against the stored user password
   const match = await utils.validPassword(req.body.pwd, user.pwd);

   if (match) {
      // Generate a JWT token for successful authentication
      const jwt = utils.issueJWT(user);

      return res.status(200).json({
         success: true,
         token: jwt.token,
         expiresIn: jwt.expires,
         user: user.firstName,
      });
   } else {
      // Return an error response for invalid credentials
      return res
         .status(401)
         .json({ success: false, message: "Invalid credentials" });
   }
};

// TODO: Needs to have the ability to retrieve a another user by id as well
/**
 * Retrieve the details of the authenticated user.
 * @param req - The request object containing the authenticated user.
 * @param res - The response object used to send the JSON response.
 * @param next - The next middleware function.
 * @returns A JSON response with the user details.
 * @throws ServerError if the user is not authenticated.
 */
export const retrieve: RequestHandler = async (req, res, next) => {
   // Cast the authenticated user to User type
   const user: User = req.user as User;

   // Check if the user is authenticated
   if (user == null) {
      throw new ServerError("You need to sign in to update user details", 401);
   }

   // Send a JSON response with the user details
   return res.status(200).json({ success: true, data: user });
};

/**
 * Retrieve a list of users based on the provided query parameters.
 * @param req - The request object containing the query parameters.
 * @param res - The response object used to send the JSON response.
 * @param next - The next middleware function.
 * @returns A JSON response with the list of users.
 */
export const list: RequestHandler = async (req, res, next) => {
   // Call the userController's list method to retrieve the list of users
   const result = await userController.list(req.query);

   // Send a JSON response with the list of users
   return res.status(200).json({ data: result });
};

/**
 * Update the user account based on the provided request body fields.
 * @param req - The request object containing the updated user data in the request body.
 * @param res - The response object used to send the JSON response.
 * @param next - The next middleware function.
 * @returns A JSON response with the updated user data.
 * @throws ServerError if the user is not authenticated or there is an error during the update process.
 */
export const update: RequestHandler = async (req, res, next) => {
   const fields = req.body;

   // Check if the user is authenticated
   if (!req.user) {
      throw new ServerError("You need to sign in to update your account", 400);
   }

   const user: User = req.user as User;

   // Call the userController's update method to update the user account
   const updatedUser = await userController.update(user.id, fields);

   return res.status(200).json(updatedUser);
};

export const remove: RequestHandler = async (req, res, next) => {
   const userId = req.params.id;

   const deletedRows = await User.destroy({ where: { id: userId } });

   if (deletedRows === 0) {
      const err = new ServerError("User Not Found", 404);
      err.name = "Unable to Delete";
      throw err;
   }

   return res.status(200).json({ message: "User deleted successfully" });
};
