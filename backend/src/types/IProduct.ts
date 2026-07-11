import { Document, Types } from "mongoose";
import { IReview } from "./IReview";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  countStock: number;
  avatar: {
    url: String;
    public_id: String;
  };
  reviews?: IReview[];
  rating?: number;
  numReviews?: number;
}
