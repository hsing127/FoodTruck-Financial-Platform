import { Request, Response } from "express";
import { salesService } from "../services/salesService";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// From API_populateSalesPage.js
export const getSalesData = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const { startDate, endDate } = req.query;
    const result = await salesService.getSalesData(
      email,
      startDate as string,
      endDate as string
    );
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ error: "Failed to fetch sales data" });
  }
};

export const createSale = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const result = await salesService.createSale(email, req.body);
    res
      .status(201)
      .json({ message: "Sale created successfully", sale: result });
  } catch (error: any) {
    console.error("Error creating sale:", error);
    res.status(500).json({ error: "Failed to create sale" });
  }
};

export const getSalesByDateRange = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const { startDate, endDate } = req.params;
    const result = await salesService.getSalesByDateRange(
      email,
      startDate,
      endDate
    );
    res.status(200).json({ sales: result });
  } catch (error: any) {
    console.error("Error fetching sales by date range:", error);
    res.status(500).json({ error: "Failed to fetch sales by date range" });
  }
};

export const getTopSellingItems = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const { limit } = req.query;
    const result = await salesService.getTopSellingItems(
      email,
      limit ? parseInt(limit as string) : 10
    );
    res.status(200).json({ topSellingItems: result });
  } catch (error: any) {
    console.error("Error fetching top selling items:", error);
    res.status(500).json({ error: "Failed to fetch top selling items" });
  }
};

export const getDailySalesReport = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const { date } = req.params;
    const result = await salesService.getDailySalesReport(email, date);
    res.status(200).json({ dailySales: result });
  } catch (error: any) {
    console.error("Error fetching daily sales report:", error);
    res.status(500).json({ error: "Failed to fetch daily sales report" });
  }
};

export const salesController = {
  getSalesData,
  createSale,
  getSalesByDateRange,
  getTopSellingItems,
  getDailySalesReport,
};
