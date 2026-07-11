import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";
import { isAdmin, isAuthenticated } from "../middleware/auth";
import {
  allCategories,
  create,
  deleteCategory,
  singleCategory,
  updateCategory,
} from "../controllers/categoryController";

router.post(
  "/category/create",
  [
    body("name")
      .trim()
      .isLength({ min: 3, max: 32 })
      .withMessage("Category is required, at least 3 letters"),
  ],
  validateRequest,
  isAuthenticated,
  isAdmin,
  create
);

router.get("/category", allCategories);
router.get("/category/:id", singleCategory);
router.delete(
  "/category/admin/delete/:id",
  isAuthenticated,
  isAdmin,
  deleteCategory
);
router.put(
  "/category/admin/edit/:id",
  isAuthenticated,
  isAdmin,
  updateCategory
);

export { router as categoryRoutes };
