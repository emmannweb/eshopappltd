import { CustomError } from "./customError";

export class NotAuthorized extends CustomError {
  codeStatus = 401;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, NotAuthorized.prototype);
  }

  formatErrors() {
    return [{ message: "Not Authorized" }];
  }
}
