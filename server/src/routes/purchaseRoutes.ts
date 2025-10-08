import express from "express";
import {
  getPurchaseData,
  createPurchase,
  getPurchasesByVendor,
  getPurchasesByDateRange,
  getMonthlyPurchaseReport,
  getTopVendors,
} from "../controllers/purchaseController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Purchase operations - From API_populatePurchasePage.js
router.get("/", getPurchaseData);
router.post("/", createPurchase);
router.get("/vendor/:vendor", getPurchasesByVendor);
router.get("/range/:startDate/:endDate", getPurchasesByDateRange);
router.get("/monthly/:year/:month", getMonthlyPurchaseReport);
router.get("/vendors/top", getTopVendors);

export default router;
