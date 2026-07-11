import { Document, Types } from "mongoose";

export interface IOrder extends Document {
  orderItems: [
    {
      name: string;
      quantity: number;
      image: string;
      price: number;
      product: Types.ObjectId;
    }
  ];

  shippingAddress: {
    fullName: string;
    address: string;
    cellPhone: string;
    city: string;
    postalCode: string;
    country: string;
  };

  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  user: Types.ObjectId;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
}
