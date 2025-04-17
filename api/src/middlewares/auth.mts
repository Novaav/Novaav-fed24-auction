import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.mjs";
import { UserDto } from "../models/userDto.mjs";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const loginCookie = req.cookies["login"];
  console.log("Login cookie in use", loginCookie);

  if (!loginCookie) {
    console.log("No login cookie found");
    res.status(401).end();
  } else {
    const result = jwt.decode(loginCookie);
    console.log("Decoded token", result);
    if (!result) {
      console.log("No result from jwt.decode");
      res.status(401).end();
    } else {
      const theUser: UserDto = result as UserDto;
      const userFromDb = await User.findOne({ name: theUser.username });

      if (userFromDb) {
        console.log("User found in DB", userFromDb);
        res.locals.user = userFromDb;
        next();
      } else {
        console.log("User not found in DB", userFromDb);
        res.status(403).send("not allowed");
      }
    }
  }
};
