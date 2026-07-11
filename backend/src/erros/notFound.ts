import { ValidationError } from "express-validator";
import { CustomError } from "./customError";

export class NotFound extends CustomError {
  codeStatus = 404;
  constructor() {
    super("Route not found");
    Object.setPrototypeOf(this, NotFound.prototype);
  }

  formatErrors() {
    return [{ message: "Not found" }];
  }
}
