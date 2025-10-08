import express from "express";
import {
  getMenuWithIngredients,
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Menu operations - From API_populateMenu.mjs
router.get("/", getMenuItems);
router.get("/with-ingredients", getMenuWithIngredients);
router.post("/", createMenuItem);
router.put("/:menuName", updateMenuItem);
router.delete("/:menuName", deleteMenuItem);

export default router;
