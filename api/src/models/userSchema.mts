import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface InterfaceUser {
  username: string;
  password: string;
}

// Skapa schema för användare
const userSchema = new Schema<InterfaceUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Hasha lösenordet innan det sparas i databasen
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);  // Salt
    this.password = await bcrypt.hash(this.password, salt);  // Hasha lösenordet
  }
  next();
});

const User = model("user", userSchema);
export default User;
