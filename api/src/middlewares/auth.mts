import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TypeUser } from "../models/userSchema.mjs";
import User from "../models/userSchema.mjs";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const loginCookie = req.cookies["login"];

  if (!loginCookie) {
    res.status(401).end();
  } else {
    const result = jwt.decode(loginCookie);
    if (!result) {
      res.status(401).end();
    } else {
      const theUser: TypeUser = result as TypeUser;
      const userFromDb = await User.findOne({ username: theUser.name });

      if (userFromDb) {
        next();
      } else {
        res.status(403).send("not allowed");
      }
    }
  }
};
