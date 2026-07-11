import mongoose, { Schema } from "mongoose";
import { IUser, IUserDocument } from "../types/IUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    about: {
      type: String,
      trim: true,
    },

    avatar: {
      type: String,
      default: null,
    },

    role: {
      type: Number,
      default: 0,
    },

    history: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Encrypting password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET!, {
    expiresIn: 3600,
  });
};

export const User = mongoose.model<IUserDocument>("User", userSchema);
