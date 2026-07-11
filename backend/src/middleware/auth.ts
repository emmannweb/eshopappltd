import { NotAuthorized } from "../erros/NotAuthorized";
import jwt from "jsonwebtoken";
import { userRepo } from "../repo/userRepo";
import { NextFunction, Request, Response } from "express";
import { IUser } from "../types/IUser";

// check if user is authenticated
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  try {
    // Make sure token exists
    if (!token) {
      throw new NotAuthorized("Not Authorized!");
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as IUser;

    req.user = await userRepo.findById(decoded.id);
    next();
  } catch (err) {
    return next(err);
  }
};

//admin middleware
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role === 0) {
    return next(new NotAuthorized("Not Authorized!"));
  }
  next();
};
