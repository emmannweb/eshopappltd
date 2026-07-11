import { NextFunction, Request, Response } from "express";
import { userRepo } from "../repo/userRepo";
import { BadRequest } from "../erros/badRequest";
import { IUserDocument } from "../types/IUser";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const useExist = await userRepo.findByEmail(email);
    if (useExist) {
      throw new BadRequest("user already exists");
    }
    const user = await userRepo.create(req.body);
    console.log(user);
    res.status(201).send({
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await userRepo.findByEmail(email);
    if (!user) {
      throw new BadRequest("Invalid credentials");
    }
    //check password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      throw new BadRequest("Invalid credentials");
    }
    // Generate JWT
    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

interface TokenOptions {
  maxAge: number;
  httpOnly: boolean;
  secure?: boolean;
}

const sendTokenResponse = async (
  user: IUserDocument,
  codeStatus: number,
  res: any
) => {
  const token = await user.getJwtToken();
  const options: TokenOptions = { maxAge: 60 * 60 * 1000, httpOnly: true };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.status(codeStatus).cookie("token", token, options).send({
    success: true,
    id: user.id,
    email: user.email,
    role: user.role,
  });
};

export const profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userRepo.findById(req.user?.id);
    res.status(200).send({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const allUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userRepo.find();
    res.status(200).send({ success: true, users });
  } catch (err) {
    next(err);
  }
};

export const singleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await userRepo.findById(id);
    res.status(200).send({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await userRepo.update(id, req.body);
    res.status(200).send({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await userRepo.delete(id);
    res.status(200).send({ success: true });
  } catch (err) {
    next(err);
  }
};

export const logOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.status(200).send({ success: true, message: "Logged out!" });
  } catch (err) {
    console.log("err", err);
  }
};
