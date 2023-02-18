import { RequestHandler } from "express";
import { User } from "../../db/models/User";
import bcrypt from "bcrypt";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    //needs to utilize Data Access Layer
    let userInfo = {
      FirstName: req.body.firstname,
      LastName: req.body.lastname,
      Email: req.body.email,
      Department: req.body.department,
      Pass: hash,
      Phone: req.body.phone,
    };

    const newUser = await User.create(userInfo);

    res
      .status(200)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const listUsers: RequestHandler = async (req, res, next) => {
  const usersList: User[] = await User.findAll();

  return res
    .status(200)
    .json({ message: "Users fetched successfully", data: usersList });
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User was not found" });
    }

    await user?.destroy();

    return res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    return res.status(500).json({ message: "User could not be deleted" });
  }
};
