import { Request, Response } from "express";
import { menuService } from "../services/menuService";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// From API_populateMenu.mjs
export const getMenuWithIngredients = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const result = await menuService.getMenuWithIngredients(email);
    res.status(200).json({ menuItems: result, userEmail: email });
  } catch (error: any) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ error: "Failed to fetch menu data" });
  }
};

export const getMenuItems = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const result = await menuService.getMenuItems(email);
    res.status(200).json({ menuItems: result });
  } catch (error: any) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
};

export const createMenuItem = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const result = await menuService.createMenuItem(email, req.body);
    res
      .status(201)
      .json({ message: "Menu item created successfully", menuItem: result });
  } catch (error: any) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ error: "Failed to create menu item" });
  }
};

export const updateMenuItem = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { menuName } = req.params;
    const email = req.user!.email;
    const result = await menuService.updateMenuItem(email, menuName, req.body);
    res.status(200).json({ message: "Menu item updated successfully", result });
  } catch (error: any) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ error: "Failed to update menu item" });
  }
};

export const deleteMenuItem = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { menuName } = req.params;
    const email = req.user!.email;
    await menuService.deleteMenuItem(email, menuName);
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "Failed to delete menu item" });
  }
};

export const menuController = {
  getMenuWithIngredients,
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
