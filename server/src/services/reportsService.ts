import { prisma } from "../config/database";

export class ReportsService {
  // From API_reportsPage.js and API_metricCalculations.js
  async getFinancialReport(email: string, startDate: string, endDate: string) {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Get sales data
      const salesData = await this.getSalesForPeriod(email, start, end);

      // Get purchase data
      const purchaseData = await this.getPurchasesForPeriod(email, start, end);

      // Get other costs
      const otherCosts = await this.getOtherCostsForPeriod(email, start, end);

      // Calculate metrics
      const totalRevenue = salesData.totalRevenue;
      const totalCOGS = purchaseData.totalPurchases;
      const totalOtherCosts = otherCosts.totalOtherCosts;
      const grossProfit = totalRevenue - totalCOGS;
      const netProfit = grossProfit - totalOtherCosts;
      const profitMargin =
        totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

      return {
        period: {
          startDate,
          endDate,
        },
        revenue: {
          totalRevenue,
          totalTransactions: salesData.transactionCount,
          averageTransactionValue:
            salesData.transactionCount > 0
              ? totalRevenue / salesData.transactionCount
              : 0,
        },
        costs: {
          costOfGoodsSold: totalCOGS,
          otherCosts: totalOtherCosts,
          totalCosts: totalCOGS + totalOtherCosts,
        },
        profitability: {
          grossProfit,
          netProfit,
          profitMargin,
          grossMargin:
            totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0,
        },
        details: {
          sales: salesData.sales,
          purchases: purchaseData.purchases,
          otherCosts: otherCosts.costs,
        },
      };
    } catch (error) {
      console.error("Error generating financial report:", error);
      throw new Error("Failed to generate financial report");
    }
  }

  async getProfitLossStatement(
    email: string,
    startDate: string,
    endDate: string
  ) {
    const financialData = await this.getFinancialReport(
      email,
      startDate,
      endDate
    );

    return {
      period: financialData.period,
      statement: {
        revenue: financialData.revenue.totalRevenue,
        costOfGoodsSold: financialData.costs.costOfGoodsSold,
        grossProfit: financialData.profitability.grossProfit,
        operatingExpenses: financialData.costs.otherCosts,
        netIncome: financialData.profitability.netProfit,
      },
      metrics: {
        grossMargin: financialData.profitability.grossMargin,
        netMargin: financialData.profitability.profitMargin,
        revenueGrowth: await this.calculateRevenueGrowth(
          email,
          startDate,
          endDate
        ),
      },
    };
  }

  async getInventoryReport(email: string) {
    const ingredients = await prisma.ingredient.findMany({
      where: { Email: email },
    });

    const totalInventoryValue = ingredients.reduce(
      (sum, item) => sum + (item.Cost || 0) * (item.Amount || 0),
      0
    );

    const lowStockItems = ingredients.filter((item) => (item.Amount || 0) < 5);
    const outOfStockItems = ingredients.filter(
      (item) => (item.Amount || 0) === 0
    );

    return {
      totalItems: ingredients.length,
      totalValue: totalInventoryValue,
      lowStockCount: lowStockItems.length,
      outOfStockCount: outOfStockItems.length,
      averageItemValue:
        ingredients.length > 0 ? totalInventoryValue / ingredients.length : 0,
      inventory: ingredients,
      alerts: {
        lowStock: lowStockItems,
        outOfStock: outOfStockItems,
      },
    };
  }

  async getSalesAnalytics(email: string, startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Top selling items
    const topItems = await prisma.$queryRaw`
      SELECT 
        s."MenuName",
        SUM(s."Quantity") as total_quantity,
        COUNT(DISTINCT s."StartDate", s."EndDate") as sales_periods,
        m."Cost" as item_price,
        SUM(s."Quantity" * m."Cost") as total_revenue
      FROM "Sold" s
      JOIN "MenuItem" m ON s."Email" = m."Email" AND s."MenuName" = m."Name"
      WHERE s."Email" = ${email}
        AND s."StartDate" >= ${start}
        AND s."EndDate" <= ${end}
      GROUP BY s."MenuName", m."Cost"
      ORDER BY total_quantity DESC
      LIMIT 10
    `;

    // Daily sales trend
    const dailySales = await prisma.$queryRaw`
      SELECT 
        DATE(s."StartDate") as sale_date,
        COUNT(DISTINCT s."StartDate", s."EndDate") as transactions,
        SUM(s."Quantity" * m."Cost") as daily_revenue,
        SUM(s."Quantity") as items_sold
      FROM "Sold" s
      JOIN "MenuItem" m ON s."Email" = m."Email" AND s."MenuName" = m."Name"
      WHERE s."Email" = ${email}
        AND s."StartDate" >= ${start}
        AND s."EndDate" <= ${end}
      GROUP BY DATE(s."StartDate")
      ORDER BY sale_date
    `;

    return {
      topSellingItems: topItems,
      dailySalesTrend: dailySales,
      period: { startDate, endDate },
    };
  }

  private async getSalesForPeriod(
    email: string,
    startDate: Date,
    endDate: Date
  ) {
    const sales = await prisma.sale.findMany({
      where: {
        Email: email,
        StartDate: { gte: startDate },
        EndDate: { lte: endDate },
      },
      include: {
        sold: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    const totalRevenue = sales.reduce((sum, sale) => {
      return (
        sum +
        (sale.sold?.reduce((saleSum, soldItem) => {
          return (
            saleSum + (soldItem.menuItem?.Cost || 0) * (soldItem.Quantity || 0)
          );
        }, 0) || 0)
      );
    }, 0);

    return {
      sales,
      totalRevenue,
      transactionCount: sales.length,
    };
  }

  private async getPurchasesForPeriod(
    email: string,
    startDate: Date,
    endDate: Date
  ) {
    const purchases = await prisma.purchase.findMany({
      where: {
        Email: email,
        DateTime: { gte: startDate, lte: endDate },
      },
      include: {
        includes: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    const totalPurchases = purchases.reduce((sum, purchase) => {
      return (
        sum +
        (purchase.includes?.reduce((purchaseSum, includedItem) => {
          return (
            purchaseSum + (includedItem.Cost || 0) * (includedItem.Amount || 0)
          );
        }, 0) || 0)
      );
    }, 0);

    return {
      purchases,
      totalPurchases,
    };
  }

  private async getOtherCostsForPeriod(
    email: string,
    startDate: Date,
    endDate: Date
  ) {
    const costs = await prisma.otherCost.findMany({
      where: {
        email: email,
        costdate: { gte: startDate, lte: endDate },
      },
    });

    const totalOtherCosts = costs.reduce(
      (sum, cost) => sum + (cost.costamount || 0),
      0
    );

    return {
      costs,
      totalOtherCosts,
    };
  }

  private async calculateRevenueGrowth(
    email: string,
    currentStart: string,
    currentEnd: string
  ) {
    // Calculate revenue growth compared to previous period
    const currentPeriod =
      new Date(currentEnd).getTime() - new Date(currentStart).getTime();
    const previousStart = new Date(
      new Date(currentStart).getTime() - currentPeriod
    );
    const previousEnd = new Date(currentStart);

    const currentRevenue = (
      await this.getSalesForPeriod(
        email,
        new Date(currentStart),
        new Date(currentEnd)
      )
    ).totalRevenue;
    const previousRevenue = (
      await this.getSalesForPeriod(email, previousStart, previousEnd)
    ).totalRevenue;

    if (previousRevenue === 0) return 0;
    return ((currentRevenue - previousRevenue) / previousRevenue) * 100;
  }
}

export const reportsService = new ReportsService();
