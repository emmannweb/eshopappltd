import { Request, Response, NextFunction } from "express";
import { CustomError } from "../erros/customError";

export const errorHandler: any = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res
      .status(err.codeStatus)
      .send({ success: false, errors: err.formatErrors() });
  }

  res.status(400).send({
    errors: [{ success: false, message: err?.name || "Something went wrong" }],
  });
};
