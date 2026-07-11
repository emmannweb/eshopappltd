import { Document, Types } from "mongoose";

export interface IReview extends Document {
  name: string;
  rating: number;
  comment: string;
  user: Types.ObjectId;
}
