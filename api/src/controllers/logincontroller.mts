// Import user from the user model
import bcrypt from "bcryptjs";
import User from "../models/userSchema.mts";

export const loginProcess = async (username: string, password: string) => {
  const foundUser = await User.findOne({ username });

  if (!foundUser) {
    throw new Error("User not found with username: " + username);
  }

  const isPasswordValid = await bcrypt.compare(password, foundUser.password);
  if (isPasswordValid) {
    return foundUser;
  } else {
    throw new Error("Invalid password for user: " + username);
  }
};
