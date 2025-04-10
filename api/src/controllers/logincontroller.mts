
import bcrypt from "bcryptjs";
import User from "../models/userSchema.mts";

export const loginProcess = async (name: string, password: string) => {
  const foundUser = await User.findOne({ name });

  if (!foundUser) {
    throw new Error("User not found with username: " + name);
  }

  const isPasswordValid = await bcrypt.compare(password, foundUser.password);
  if (isPasswordValid) {
    return foundUser;
  } else {
    throw new Error("Invalid password for user: " + name);
  }
};
