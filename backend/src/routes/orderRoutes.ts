import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";
import { isAdmin, isAuthenticated } from "../middleware/auth";
import {
  allOrders,
  createOrder,
  ordersme,
  orderSumaryAdmin,
} from "../controllers/orderController";

router.get("/orders", isAuthenticated, isAdmin, allOrders);
router.get("/orders/me", isAuthenticated, ordersme);
router.post("/orders", isAuthenticated, createOrder);
router.get("/orders/summary", isAuthenticated, isAdmin, orderSumaryAdmin);

export { router as orderRoutes };
