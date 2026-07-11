import { NextFunction, Request, Response } from "express";
import { categoryRepo } from "../repo/categoryRepo";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryRepo.create(req.body);
    res.status(200).json({
      success: true,
      category,
    });
  } catch (err) {
    next(err);
  }
};

//display categories
export const allCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryRepo.find();
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (err) {
    next(err);
  }
};

export const singleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = await categoryRepo.findById(id);
    res.status(200).json({
      success: true,
      category,
    });
  } catch (err) {
    next(err);
  }
};

//update category
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryRepo.update(req.params.id, req.body);
    res.status(200).json({
      success: true,
      category,
    });
  } catch (err) {
    next(err);
  }
};

//delete category
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryRepo.delete(req.params.id);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
