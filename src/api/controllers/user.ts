import { RequestHandler } from "express";
import { User } from "../../db/models/User";
import * as utils from "../../crypto/utils";
import bcrypt from "bcrypt";
import { Json } from "sequelize/types/utils";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const salt = await utils.genSalt();
    const hash = await utils.genHash(req.body.password, salt);

    //needs to utilize Data Access Layer
    let userInfo = {
      FirstName: req.body.firstname,
      LastName: req.body.lastname,
      Email: req.body.email,
      Department: req.body.department,
      Hash: hash,
      Salt: salt,
      Phone: req.body.phone,
    };

    // need to implement service
    const newUser = await User.create(userInfo);

    const jwt = utils.issueJWT(newUser);

    res.status(200).json({
      message: "User created successfully",
      data: newUser,
      token: jwt.token,
      expiresIn: jwt.expires,
    });
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
    const deletedUserCount: number = await User.destroy({
      where: { id: req.params.id },
    });

    if (deletedUserCount == 0) {
      return res.status(404).json({ message: "User could not be found" });
    }

    return res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    return res.status(500).json({ message: "User could not be deleted" });
  }
};

// TODO: Need to only get the data that we need to update
export const updateUser: RequestHandler = async (req, res, next) => {
  const userInfo = {
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    email: req.body.email,
    department: req.body.department,
  };

  try {
    const arr = await User.update(
      {
        FirstName: userInfo.firstname,
        LastName: userInfo.lastname,
        Phone: userInfo.phone,
        Email: userInfo.email,
        Department: userInfo.department,
      },
      {
        where: { id: userInfo.id },
      }
    );

    return res.status(200).json({
      message: "User information was updated",
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to update user" });
  }
};

export const retrieveUser: RequestHandler = async (req, res, next) => {
  try {
    const user: User = req.user as User;

    if (user == null) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json({ message: "User found!", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to retrieve user!" });
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ where: { Email: req.body.email } });

    if (userInfo == null) {
      return res
        .status(404)
        .json({ message: "User with that email was not found" });
    }

    const match = await utils.validPassword(req.body.password, userInfo.Hash);

    if (match) {
      const jwt = utils.issueJWT(userInfo);

      return res.status(200).json({
        success: true,
        token: jwt.token,
        expiresIn: jwt.expires,
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
