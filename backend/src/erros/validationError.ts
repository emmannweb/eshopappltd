import { ValidationError } from "express-validator";
import { CustomError } from "./customError";

export class ValidationErrorRequest extends CustomError {
  codeStatus = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid Request");
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, ValidationErrorRequest.prototype);
  }

  formatErrors() {
    return this.errors.map((err) => {
      if (err.type === "field") {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
  }
}
