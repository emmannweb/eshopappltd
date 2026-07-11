import mongoose, { Schema } from "mongoose";
import { ICategory } from "../types/ICategory";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategory>("Category", categorySchema);
