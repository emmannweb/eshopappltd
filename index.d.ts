import { IUser } from "./backend/src/types/IUser";

declare global {
  namespace Express {
    interface Request {
      user?: IUser | null;
    }
  }
}

export {};
