import { User, UserInput, UserOutput } from "../models/User";
import * as util from "../../crypto/utils";

export const create = async (payload: UserInput): Promise<UserOutput> => {
  payload.salt = await util.genSalt();
  payload.pwd = await util.genHash(payload.pwd, payload.salt);

  const user = await User.create(payload);

  return user;
};
