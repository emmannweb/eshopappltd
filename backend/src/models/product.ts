import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Schema;
import { IReview } from "../types/IReview";
import { IProduct } from "../types/IProduct";

const reviewSchema = new Schema<IReview>(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add the product name"],
      maxLength: 32,
    },

    description: {
      type: String,
      trim: true,
      required: [true, "Please add the product description"],
      maxLength: 2000,
    },

    price: {
      type: Number,
      trim: true,
      required: [true, "Product must have a price"],
      maxLength: 32,
    },

    category: {
      type: ObjectId,
      ref: "Category",
      required: [true, "Product must belong to a category"],
    },

    countStock: {
      type: Number,
    },

    avatar: {
      url: String,
      public_id: String,
    },

    reviews: [reviewSchema],

    rating: {
      type: Number,
      required: true,
      default: 0,
    },

    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
