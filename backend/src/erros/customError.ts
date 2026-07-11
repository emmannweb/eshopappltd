export abstract class CustomError extends Error {
  abstract codeStatus: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract formatErrors(): { message: string; field?: string }[];
}
