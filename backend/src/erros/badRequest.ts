import { CustomError } from "./customError";

export class BadRequest extends CustomError {
  codeStatus = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequest.prototype);
  }

  formatErrors() {
    return [{ message: this.message }];
  }
}
