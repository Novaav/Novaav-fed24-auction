import { Request, Response } from "express";
import User from "../models/userSchema.mts";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // Kolla om användaren redan finns (via både email och username)
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser)
      return res.status(409).json({ message: "User with this username or email already exists" });

    // Hasha lösenordet innan det sparas i databasen
    const hashedPassword = await bcrypt.hash(password, 10);

    // Skapa och spara användaren
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
