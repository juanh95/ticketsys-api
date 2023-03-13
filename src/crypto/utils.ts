import jsonwebtoken from "jsonwebtoken";
import { User } from "../db/models/User";
import bcrypt from "bcrypt";

import fs from "fs";
import path from "path";

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf-8");

const saltRounds = 10;

export async function validPassword(password: string, hash: string) {
  try {
    const match = await bcrypt.compare(password, hash);

    return match;
  } catch (error) {
    console.log("Unable to compare passwords");
    return false;
  }
}

export function issueJWT(user: User) {
  const id = user.id;
  const expiresIn = "1d";

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

export async function genSalt(): Promise<string> {
  const salt: string = bcrypt.genSaltSync(saltRounds);
  return salt;
}

export async function genHash(password: string, salt: string): Promise<string> {
  const hash: string = bcrypt.hashSync(password, salt);
  return hash;
}
