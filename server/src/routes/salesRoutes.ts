import express from "express";
import {
  getSalesData,
  createSale,
  getSalesByDateRange,
  getTopSellingItems,
  getDailySalesReport,
} from "../controllers/salesController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Sales operations - From API_populateSalesPage.js
router.get("/", getSalesData);
router.post("/", createSale);
router.get("/range/:startDate/:endDate", getSalesByDateRange);
router.get("/top-items", getTopSellingItems);
router.get("/daily/:date", getDailySalesReport);

export default router;
