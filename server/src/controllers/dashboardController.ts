import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    /* 
    Example Database Info pulls for dashboard - 

    // Copied from a public dashboard example to be converted for ours
    // const popularProducts = await prisma.products.findMany({
    //   take: 15,
    //   orderBy: {
    //     stockQuantity: "desc",
    //   },
    // });
    // const salesSummary = await prisma.salesSummary.findMany({
    //   take: 5,
    //   orderBy: {
    //     date: "desc",
    //   },
    });

    */

    res.json({

    //   popularProducts,
    //   salesSummary
    
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dashboard metrics" });
  }
};
