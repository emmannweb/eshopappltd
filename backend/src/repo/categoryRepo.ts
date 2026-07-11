import { BaseRepo } from "./baseRepository/baseRepo";
import { ICategory } from "../types/ICategory";
import { Category } from "../models/category";
import { Model } from "mongoose";

class CategoryRepo extends BaseRepo<ICategory> {
  constructor(model: Model<ICategory>) {
    super(model);
  }
}

export const categoryRepo = new CategoryRepo(Category);
