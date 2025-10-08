import express from "express";
import {
  deleteIngredient,
  deletePurchase,
  deleteIncludes,
  deleteMenuItem,
  deleteSale,
  deleteSold,
  deleteUses,
  deleteOtherCost,
  updateIngredient,
  updatePurchase,
  getData,
  populateDatabase,
} from "../controllers/dataController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Delete operations for different tables - From API_deleteRow.js
router.delete("/ingredient", deleteIngredient);
router.delete("/purchase", deletePurchase);
router.delete("/includes", deleteIncludes);
router.delete("/menu-item", deleteMenuItem);
router.delete("/sale", deleteSale);
router.delete("/sold", deleteSold);
router.delete("/uses", deleteUses);
router.delete("/other-cost", deleteOtherCost);

// Update operations - From API_updateTables.js
router.put("/ingredient", updateIngredient);
router.put("/purchase", updatePurchase);

// Get data operations - From API_displayData.mjs
router.get("/:tableName", getData);

// Database population - From API_DBpopulator.mjs
router.post("/populate", populateDatabase);

export default router;
