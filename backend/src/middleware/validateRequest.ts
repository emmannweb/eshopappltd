import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ValidationErrorRequest } from "../erros/validationError";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ValidationErrorRequest(errors.array());
  }
  next();
};
