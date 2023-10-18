import fs from "fs";
import path from "path";
import { User } from "../database/models/User";
import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import jwt, { JwtPayload } from "jsonwebtoken";

const pathToKey = path.join(__dirname, "../crypto", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf-8");

// Define `options` object with following properties:
const options = {
   // jwtFromRequest: defines how JSON web token (JWT) should be extracted from the request. Here we are using
   // `fromAuthHeaderAsBearerToken()` method to extract JWT from authorization header as a bearer token.
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

   // secretOrKey: a string or buffer containing the shared secret (symmetric) or public key (asymmetric) for verifying
   // the token's signature. Here we are using a PUBLIC KEY named PUB_KEY to verify the JWT signature.
   secretOrKey: PUB_KEY,

   // algorithms: an array of strings specifying which algorithms are allowed for signing the token. Here we are allowing
   // only one algorithm, i.e., RS256.

   algorithms: ["RS256"],
};

// creating a new JwtStrategy by invoking constructor with "options" and an asynchronous callback function.
const strategy = new JwtStrategy(options, async (payload, done) => {
   // Check if payload is null or undefined
   if (payload == null) {
      // If payload is null, call done function with null argument and false status.
      return done(null, false);
   }

   // Decoded token gets casted as JwtPayload
   const decodedData: JwtPayload = payload as JwtPayload;

   // Get current time in seconds since EPOCH
   const now = Math.floor(Date.now() / 1000);

   // Check if decoded data does not have exp value or if it has expired, then call done function with false argument.
   if (decodedData?.exp && now > Math.floor(decodedData.exp / 1000)) {
      return done(null, false);
   }

   // try-catch block to handle errors while fetching user data asynchronously
   try {
      // Finding a user record from the database based on the value of the 'sub' property in the JWT payload
      const user = await User.findByPk(decodedData.sub);

      if (user) {
         //If user is not null i.e., user exists in our DB then its passed as a first parameter to 'done' callback function.
         return done(null, user);
      } else {
         // If there’s no user, its passed false as a second parameter to the 'done' callback function.
         return done(null, false);
      }
   } catch (error) {
      //If any error occured during user data retrieval or validation it's passed to the callback function along with false value as a second parameter.
      done(error, false);
   }
});

export default strategy;
