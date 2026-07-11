import { Model, Document } from "mongoose";
import { IBaseRepo } from "../../types/IBaseRepo";

export abstract class BaseRepo<T extends Document> implements IBaseRepo<T> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: any): Promise<T> {
    return this.model.create(data);
  }

  async find(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async count(): Promise<number> {
    return this.model.find({}).estimatedDocumentCount();
  }

  async findAllPaginatedWithFilter(
    filter: any,
    page: number,
    pageSize: number
  ): Promise<T[]> {
    return this.model
      .find(filter)
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .exec();
  }

  async aggregate(data: Array<any>) {
    return this.model.aggregate(data);
  }
}
