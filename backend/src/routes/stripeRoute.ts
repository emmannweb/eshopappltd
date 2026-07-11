import express from "express";
const router = express.Router();
import { isAuthenticated } from "../middleware/auth";
import { stripeController } from "../controllers/stripeController";

router.post("/payment/create", isAuthenticated, stripeController);

export { router as paymentRoutes };
