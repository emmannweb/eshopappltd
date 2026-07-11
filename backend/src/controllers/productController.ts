import { IProduct } from "../types/IProduct";
import { productRepo } from "../repo/productRepo";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { cloudinary } from "../utils/cloudinary";
import { BadRequest } from "../erros/badRequest";
import { NotFound } from "../erros/notFound";

export const createProduct = async (
  req: Request<{}, {}, IProduct>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, countStock, avatar, category } = req.body;
    //upload image in cloudinary
    const result = await cloudinary.uploader.upload(avatar, {
      folder: "eshop",
      width: 1200,
      crop: "scale",
    });

    const product = await productRepo.create({
      name,
      description,
      price,
      countStock,
      category,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(200).send({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

export const allProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // enable search
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  // enable pagination
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const count = await productRepo.count();

  try {
    const products = await productRepo.findProductAndPopulate(
      keyword,
      pageSize,
      page
    );

    res.status(200).json({
      success: true,
      products,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  } catch (error) {
    return next(error);
  }
};

export const singleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productRepo.findSingleProductAndPopulate(
      req.params.id
    );
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(error);
  }
};

export const createProductReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rating, comment } = req.body;

    const product = await productRepo.findSingleProductAndPopulate(req.params.id);

    if (!product) {
      return next(new NotFound());
    }

    const userId = String(req.user?._id);
    const alreadyReviewed = product.reviews?.find(
      (review) => review.user.toString() === userId
    );

    if (alreadyReviewed) {
      return next(new BadRequest("Product already reviewed"));
    }

    const review = {
      name: req.user?.name || "Anonymous",
      rating: Number(rating),
      comment,
      user: req.user?._id as Types.ObjectId,
    };

    product.reviews = product.reviews
      ? [...product.reviews, review as any]
      : [review as any];
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added" });
  } catch (error) {
    return next(error);
  }
};

export const editProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productRepo.update(req.params.id, req.body);
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productRepo.delete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    return next(error);
  }
};
