import { Request, Response } from "express";
import { dataService } from "../services/dataService";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// From API_deleteRow.js - Delete ingredient
export const deleteIngredient = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { Name } = req.body;
    const Email = req.user!.email;

    await dataService.deleteIngredient({ Email, Name });
    res.status(200).json({ message: "Ingredient deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting ingredient:", error);
    res.status(500).json({ error: "Failed to delete ingredient" });
  }
};

// From API_deleteRow.js - Delete purchase
export const deletePurchase = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { DateTime, Location } = req.body;
    const Email = req.user!.email;

    await dataService.deletePurchase({ Email, DateTime, Location });
    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting purchase:", error);
    res.status(500).json({ error: "Failed to delete purchase" });
  }
};

// From API_deleteRow.js - Delete includes
export const deleteIncludes = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { DateTime, Location, IngredientName } = req.body;
    const Email = req.user!.email;

    await dataService.deleteIncludes({
      Email,
      DateTime,
      Location,
      IngredientName,
    });
    res.status(200).json({ message: "Includes deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting includes:", error);
    res.status(500).json({ error: "Failed to delete includes" });
  }
};

// From API_deleteRow.js - Delete menu item
export const deleteMenuItem = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { Name } = req.body;
    const Email = req.user!.email;

    await dataService.deleteMenuItem({ Email, Name });
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "Failed to delete menu item" });
  }
};

// From API_deleteRow.js - Delete sale
export const deleteSale = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { StartDate, EndDate } = req.body;
    const Email = req.user!.email;

    await dataService.deleteSale({ Email, StartDate, EndDate });
    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting sale:", error);
    res.status(500).json({ error: "Failed to delete sale" });
  }
};

// From API_deleteRow.js - Delete sold
export const deleteSold = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { StartDate, EndDate, MenuName } = req.body;
    const Email = req.user!.email;

    await dataService.deleteSold({ Email, StartDate, EndDate, MenuName });
    res.status(200).json({ message: "Sold record deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting sold record:", error);
    res.status(500).json({ error: "Failed to delete sold record" });
  }
};

// From API_deleteRow.js - Delete uses
export const deleteUses = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { MenuName, IngredientName } = req.body;
    const Email = req.user!.email;

    await dataService.deleteUses({ Email, MenuName, IngredientName });
    res.status(200).json({ message: "Uses record deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting uses record:", error);
    res.status(500).json({ error: "Failed to delete uses record" });
  }
};

// From API_deleteRow.js - Delete other cost
export const deleteOtherCost = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { CostDate, CostName } = req.body;
    const Email = req.user!.email;

    await dataService.deleteOtherCost({ Email, CostDate, CostName });
    res.status(200).json({ message: "Other cost deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting other cost:", error);
    res.status(500).json({ error: "Failed to delete other cost" });
  }
};

// From API_updateTables.js - Update ingredient
export const updateIngredient = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { Name, newData } = req.body;
    const Email = req.user!.email;

    const result = await dataService.updateIngredient({ Email, Name, newData });
    res
      .status(200)
      .json({ message: "Ingredient updated successfully", result });
  } catch (error: any) {
    console.error("Error updating ingredient:", error);
    res.status(500).json({ error: "Failed to update ingredient" });
  }
};

// From API_updateTables.js - Update purchase
export const updatePurchase = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { DateTime, Location, newData } = req.body;
    const Email = req.user!.email;

    const result = await dataService.updatePurchase({
      Email,
      DateTime,
      Location,
      newData,
    });
    res.status(200).json({ message: "Purchase updated successfully", result });
  } catch (error: any) {
    console.error("Error updating purchase:", error);
    res.status(500).json({ error: "Failed to update purchase" });
  }
};

// From API_displayData.mjs - Get data
export const getData = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { tableName } = req.params;
    const email = req.user!.email;

    const data = await dataService.getData(tableName, email);
    res.status(200).json({ data, tableName, userEmail: email });
  } catch (error: any) {
    console.error("Error getting data:", error);

    if (error.message.includes("not supported")) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: "Failed to get data" });
  }
};

// From API_DBpopulator.mjs - Populate database
export const populateDatabase = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const result = await dataService.populateDatabase(email);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Error populating database:", error);
    res.status(500).json({ error: "Failed to populate database" });
  }
};

export const dataController = {
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
};
