import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from Authorization header

  if (!token) {
    return res.sendStatus(403); // return Forbidden
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // return Forbidden
    }

    req.user = user as User;
    next();
  });
};
