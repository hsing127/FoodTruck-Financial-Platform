import { Request, Response } from "express";
import { inventoryService } from "../services/inventoryService";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// From API_populateInventoryPage.js
export const getInventoryData = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const result = await inventoryService.getInventoryData(email);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ error: "Failed to fetch inventory data" });
  }
};

export const addIngredient = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const result = await inventoryService.addIngredient(email, req.body);
    res
      .status(201)
      .json({ message: "Ingredient added successfully", ingredient: result });
  } catch (error: any) {
    console.error("Error adding ingredient:", error);
    res.status(500).json({ error: "Failed to add ingredient" });
  }
};

export const updateIngredient = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { ingredientName } = req.params;
    const email = req.user!.email;
    const result = await inventoryService.updateIngredient(
      email,
      ingredientName,
      req.body
    );
    res
      .status(200)
      .json({ message: "Ingredient updated successfully", result });
  } catch (error: any) {
    console.error("Error updating ingredient:", error);
    res.status(500).json({ error: "Failed to update ingredient" });
  }
};

export const deleteIngredient = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { ingredientName } = req.params;
    const email = req.user!.email;
    await inventoryService.deleteIngredient(email, ingredientName);
    res.status(200).json({ message: "Ingredient deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting ingredient:", error);
    res.status(500).json({ error: "Failed to delete ingredient" });
  }
};

export const updateInventoryStock = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { ingredientName } = req.params;
    const { quantityChange } = req.body;
    const email = req.user!.email;
    const result = await inventoryService.updateInventoryStock(
      email,
      ingredientName,
      quantityChange
    );
    res.status(200).json({ message: "Stock updated successfully", result });
  } catch (error: any) {
    console.error("Error updating stock:", error);

    if (error.message === "Ingredient not found") {
      res.status(404).json({ error: error.message });
      return;
    }

    if (error.message === "Insufficient stock") {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: "Failed to update stock" });
  }
};

export const getLowStockAlert = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const { threshold } = req.query;
    const result = await inventoryService.getLowStockAlert(
      email,
      threshold ? parseInt(threshold as string) : 5
    );
    res.status(200).json({ lowStockItems: result });
  } catch (error: any) {
    console.error("Error getting low stock alert:", error);
    res.status(500).json({ error: "Failed to get low stock alert" });
  }
};

export const inventoryController = {
  getInventoryData,
  addIngredient,
  updateIngredient,
  deleteIngredient,
  updateInventoryStock,
  getLowStockAlert,
};
