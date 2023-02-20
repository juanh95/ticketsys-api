import { RequestHandler } from "express";
import { Token } from "../../db/models/Token";
import { User } from "../../db/models/User";

export const createToken: RequestHandler = async (req, res, next) => {
  const tokenBuild = {
    id: req.body.id,
    userId: req.body.userId,
    token: req.body.token,
  };

  try {
    const newToken = await Token.create(tokenBuild);

    return res.status(200).json({ message: "Token created", data: newToken });
  } catch (error) {
    return res.status(500).json({ message: "Could not create token" });
  }
};

export const retrieveUserFromToken: RequestHandler = async (req, res, next) => {
  try {
    const tokenInfo = await Token.findOne({
      where: { id: req.params.id },
      include: [User],
    });

    return res
      .status(200)
      .json({ message: "Found the user with that token", data: tokenInfo });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
