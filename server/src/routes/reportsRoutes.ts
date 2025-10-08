import express from "express";
import {
  getFinancialReport,
  getProfitLossStatement,
  getInventoryReport,
  getSalesAnalytics,
} from "../controllers/reportsController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Reports operations - From API_reportsPage.js and API_metricCalculations.js
router.get("/financial", getFinancialReport);
router.get("/profit-loss", getProfitLossStatement);
router.get("/inventory", getInventoryReport);
router.get("/sales-analytics", getSalesAnalytics);

export default router;
