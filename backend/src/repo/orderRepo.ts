import { BaseRepo } from "./baseRepository/baseRepo";
import { Order } from "../models/order";
import { IOrder } from "../types/IOrder";
import { Model } from "mongoose";
import { IUser } from "../types/IUser";

class OrderRepo extends BaseRepo<IOrder> {
  constructor(model: Model<IOrder>) {
    super(model);
  }

  async findOrdersAndPopulate(
    pageSize: number,
    page: number,
  ): Promise<IOrder[] | null> {
    return this.model
      .find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
  }

  async myOrders(userId: IUser): Promise<IOrder[] | null> {
    return this.model.find({ user: userId }).sort({ createdAt: -1 });
  }
}

export const orderRepo = new OrderRepo(Order);
