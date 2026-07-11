import { BaseRepo } from "./baseRepository/baseRepo";
import { IUserDocument } from "../types/IUser";
import { User } from "../models/user";
import { Model } from "mongoose";

class UserRepo extends BaseRepo<IUserDocument> {
  constructor(model: Model<IUserDocument>) {
    super(model);
  }

  async findByEmail(email: string): Promise<IUserDocument | null> {
    return this.model.findOne({ email });
  }

  async findById(id: string): Promise<IUserDocument | null> {
    return this.model.findById(id).select("-password");
  }
}

export const userRepo = new UserRepo(User);
