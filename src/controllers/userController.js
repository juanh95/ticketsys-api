// const db = require("../models");
// const bcrypt = require("bcrypt");

import db from "../models/index.js";
import bcrypt from "bcrypt";

// create main Model

const User = db.Users;

// main work

// 1. create user
const createUser = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    let userInfo = {
      FirstName: req.body.firstname,
      LastName: req.body.lastname,
      Email: req.body.email,
      Department: req.body.department,
      Pass: hash,
      Phone: req.body.phone,
    };

    const newUser = await User.create(userInfo);

    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send(`Failed to create account for ${req.body.email}`);
  }
};

// 2. get all users

const listUsers = async (req, res) => {
  let users = await User.findAll({
    attributes: ["Email", "FirstName", "LastName", "Department"],
  });
  res.status(200).send(users);
};

// 3. get single user

const getUser = async (req, res) => {
  let id = req.params.id;
  let user = await User.findOne({
    where: { id: id },
  });
  res.status(200).send(user);
};

export { createUser, listUsers, getUser };
