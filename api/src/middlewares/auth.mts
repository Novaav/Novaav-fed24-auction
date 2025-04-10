import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.mjs";
import { UserDto } from "../models/userDto.mjs";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const loginCookie = req.cookies["login"];

  if (!loginCookie) {
    res.status(401).end();
  } else {
    const result = jwt.decode(loginCookie);
    if (!result) {
      res.status(401).end();
    } else {
      const theUser: UserDto = result as UserDto;
      const userFromDb = await User.findOne({ username: theUser.username });

      if (userFromDb) {
        next();
      } else {
        res.status(403).send("not allowed");
      }
    }
  }
};
