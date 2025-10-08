import express from "express";
import {
  getInventoryData,
  addIngredient,
  updateIngredient,
  deleteIngredient,
  updateInventoryStock,
  getLowStockAlert,
} from "../controllers/inventoryController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Inventory operations - From API_populateInventoryPage.js
router.get("/", getInventoryData);
router.post("/", addIngredient);
router.put("/:ingredientName", updateIngredient);
router.delete("/:ingredientName", deleteIngredient);
router.patch("/:ingredientName/stock", updateInventoryStock);
router.get("/alerts/low-stock", getLowStockAlert);

export default router;
