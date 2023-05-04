import jsonwebtoken from "jsonwebtoken";
import { User } from "../api/interfaces/index";
import bcrypt from "bcrypt";

import fs from "fs";
import path from "path";

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf-8");

const saltRounds = 10;

// Function that checks if a given password matches the given hash asynchronously
export async function validPassword(password: string, hash: string) {
   try {
      // Compare the given password with the given hash using the bcrypt library synchronously
      const match = await bcrypt.compareSync(password, hash);

      // Return whether the two values match or not
      return match;
   } catch (error) {
      // Log an error message to the console if there was an issue with the comparison
      console.log("Unable to compare passwords");

      // Return false to indicate that the comparison failed
      return false;
   }
}

// Function that issues a JSON Web Token (JWT) for the given user
export function issueJWT(user: User) {
   // Extract user id and set expiration time for token
   const id = user.id;
   // Milliseconds from now
   const expiresIn = 7200000;

   // Create payload with user id and issued at time
   const payload = {
      sub: id,
      iat: Date.now(),
   };

   // Sign payload using private key, specified expiration time and RSA256 algorithm
   const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
      expiresIn: expiresIn,
      algorithm: "RS256",
   });

   // Return object with bearer token and expiration time
   return {
      token: "Bearer " + signedToken,
      expires: expiresIn,
   };
}

// Function that generates a salt for use in hashing a password asynchronously
export async function genSalt(): Promise<string> {
   // Generate a salt using the bcrypt library synchronously
   const salt: string = bcrypt.genSaltSync(saltRounds);

   // Return the generated salt as a promise
   return salt;
}

// Function that generates a hash for the given password and salt asynchronously
export async function genHash(password: string, salt: string): Promise<string> {
   // Generate a hash for the given password and salt using the bcrypt library synchronously
   const hash: string = bcrypt.hashSync(password, salt);

   // Return the generated hash as a promise
   return hash;
}
