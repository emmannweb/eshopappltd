import { BaseRepo } from "./baseRepository/baseRepo";
import { Product } from "../models/product";
import { IProduct } from "../types/IProduct";
import { Model } from "mongoose";

class ProductRepo extends BaseRepo<IProduct> {
  constructor(model: Model<IProduct>) {
    super(model);
  }

  async findProductAndPopulate(
    { ...keyword },
    pageSize: number,
    page: number
  ): Promise<IProduct[] | null> {
    return this.model
      .find({ ...keyword })
      .sort({ createdAt: -1 })
      .populate("category")
      .skip(pageSize * (page - 1))
      .limit(pageSize);
  }

  async findSingleProductAndPopulate(id: string): Promise<IProduct | null> {
    return this.model.findById(id).populate("category");
  }
}

export const productRepo = new ProductRepo(Product);
