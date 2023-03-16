import { User } from "../../db/models/User";
import { UserInput, UserOutput } from "../../db/models/User";
import * as userDal from "../../db/dal/user";

export const create = async (payload: UserInput): Promise<UserOutput> => {
  console.log("got to the service");

  return userDal.create(payload);
};

export const checkEmailExists = async (payload: string): Promise<boolean> => {
  const result = await User.findOne({ where: { email: payload } });
  return result ? true : false;
};
