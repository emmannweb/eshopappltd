import { Types } from "mongoose";

export interface IBaseRepo<T> {
  create(data: T): Promise<T>;
  find(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  update(id: string, data: T): Promise<T | null>;
  delete(id: string): Promise<T | null>;
  count(): Promise<number>;
  findAllPaginatedWithFilter(
    filter: any,
    page: number,
    pageSize: number
  ): Promise<T[]>;
}
