import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";
import { isAdmin, isAuthenticated } from "../middleware/auth";
import {
  allProducts,
  createProduct,
  createProductReview,
  deleteProduct,
  editProduct,
  singleProduct,
} from "../controllers/productController";

router.post(
  "/products/create",
  [
    body("name")
      .trim()
      .isLength({ min: 3, max: 32 })
      .withMessage("Product is required, at least 3 letters"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  isAuthenticated,
  isAdmin,
  createProduct
);

router.get("/products", allProducts);
router.get("/products/:id", singleProduct);
router.post("/products/:id/reviews", isAuthenticated, createProductReview);
router.put("/products/:id", isAuthenticated, isAdmin, editProduct);
router.delete("/products/delete/:id", isAuthenticated, isAdmin, deleteProduct);

export { router as productRoutes };
