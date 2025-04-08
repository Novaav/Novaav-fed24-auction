import { model, Schema } from "mongoose";

export interface InterfaceUser {
    name: string;
    password: string;
}

const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
});

const User = model("user", userSchema);
export default User;