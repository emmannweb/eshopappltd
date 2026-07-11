import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  about: string;
  avatar: string;
  role: number;
  history: Array<string>;
}

export interface IUserDocument extends IUser, Document {
  comparePassword: (password: string) => Promise<boolean>;
  getJwtToken: () => string;
}
