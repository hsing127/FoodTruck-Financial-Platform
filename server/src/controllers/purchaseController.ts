import { Request, Response } from "express";
import { purchaseService } from "../services/purchaseService";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// From API_populatePurchasePage.js
export const getPurchaseData = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const { startDate, endDate } = req.query;
    const result = await purchaseService.getPurchaseData(
      email,
      startDate as string,
      endDate as string
    );
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Error fetching purchase data:", error);
    res.status(500).json({ error: "Failed to fetch purchase data" });
  }
};

export const createPurchase = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const result = await purchaseService.createPurchase(email, req.body);
    res
      .status(201)
      .json({ message: "Purchase created successfully", purchase: result });
  } catch (error: any) {
    console.error("Error creating purchase:", error);
    res.status(500).json({ error: "Failed to create purchase" });
  }
};

export const getPurchasesByVendor = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const { vendor } = req.params;
    const result = await purchaseService.getPurchasesByVendor(email, vendor);
    res.status(200).json({ purchases: result });
  } catch (error: any) {
    console.error("Error fetching purchases by vendor:", error);
    res.status(500).json({ error: "Failed to fetch purchases by vendor" });
  }
};

export const getPurchasesByDateRange = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const { startDate, endDate } = req.params;
    const result = await purchaseService.getPurchasesByDateRange(
      email,
      startDate,
      endDate
    );
    res.status(200).json({ purchases: result });
  } catch (error: any) {
    console.error("Error fetching purchases by date range:", error);
    res.status(500).json({ error: "Failed to fetch purchases by date range" });
  }
};

export const getMonthlyPurchaseReport = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const { year, month } = req.params;
    const result = await purchaseService.getMonthlyPurchaseReport(
      email,
      parseInt(year),
      parseInt(month)
    );
    res.status(200).json({ monthlyPurchases: result });
  } catch (error: any) {
    console.error("Error fetching monthly purchase report:", error);
    res.status(500).json({ error: "Failed to fetch monthly purchase report" });
  }
};

export const getTopVendors = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const { limit } = req.query;
    const result = await purchaseService.getTopVendors(
      email,
      limit ? parseInt(limit as string) : 5
    );
    res.status(200).json({ topVendors: result });
  } catch (error: any) {
    console.error("Error fetching top vendors:", error);
    res.status(500).json({ error: "Failed to fetch top vendors" });
  }
};

export const purchaseController = {
  getPurchaseData,
  createPurchase,
  getPurchasesByVendor,
  getPurchasesByDateRange,
  getMonthlyPurchaseReport,
  getTopVendors,
};
