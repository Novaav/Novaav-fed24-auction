import { model, Schema } from "mongoose";

export type TypeUser {
  name: string;
  password: string;
}

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model("user", userSchema);
export default User;
