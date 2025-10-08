import { Request, Response } from "express";
import { reportsService } from "../services/reportsService";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// From API_reportsPage.js and API_metricCalculations.js
export const getFinancialReport = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      res.status(400).json({ error: "Start date and end date are required" });
      return;
    }

    const result = await reportsService.getFinancialReport(
      email,
      startDate as string,
      endDate as string
    );
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Error generating financial report:", error);
    res.status(500).json({ error: "Failed to generate financial report" });
  }
};

export const getProfitLossStatement = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      res.status(400).json({ error: "Start date and end date are required" });
      return;
    }

    const result = await reportsService.getProfitLossStatement(
      email,
      startDate as string,
      endDate as string
    );
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Error generating profit loss statement:", error);
    res.status(500).json({ error: "Failed to generate profit loss statement" });
  }
};

export const getInventoryReport = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const result = await reportsService.getInventoryReport(email);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Error generating inventory report:", error);
    res.status(500).json({ error: "Failed to generate inventory report" });
  }
};

export const getSalesAnalytics = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.user!.email;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      res.status(400).json({ error: "Start date and end date are required" });
      return;
    }

    const result = await reportsService.getSalesAnalytics(
      email,
      startDate as string,
      endDate as string
    );
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Error generating sales analytics:", error);
    res.status(500).json({ error: "Failed to generate sales analytics" });
  }
};

export const reportsController = {
  getFinancialReport,
  getProfitLossStatement,
  getInventoryReport,
  getSalesAnalytics,
};
