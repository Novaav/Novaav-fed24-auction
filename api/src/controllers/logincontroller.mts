import bcrypt from "bcryptjs";
import { convertDbUserToDto } from "./registercontroller.mts";
import User from "../models/userSchema.mjs";

export const login = async (name: string, password: string) => {
  const foundUser = await User.findOne({ name: name });

  if (!foundUser) {
    throw Error("Did not find user with email " + name);
  }

  const success = await bcrypt.compare(password, foundUser.password);
  if (success) {
    return convertDbUserToDto(foundUser);
  } else {
    return null;
  }
};
