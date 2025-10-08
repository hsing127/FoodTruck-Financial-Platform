import { prisma } from "../config/database";

export class SalesService {
  // From API_populateSalesPage.js
  async getSalesData(email: string, startDate?: string, endDate?: string) {
    try {
      const whereClause: any = { Email: email };

      if (startDate && endDate) {
        whereClause.StartDate = {
          gte: new Date(startDate),
        };
        whereClause.EndDate = {
          lte: new Date(endDate),
        };
      }

      const sales = await prisma.sale.findMany({
        where: whereClause,
        include: {
          sold: {
            include: {
              menuItem: true,
            },
          },
        },
        orderBy: { StartDate: "desc" },
      });

      // Calculate sales metrics
      const totalRevenue = sales.reduce((sum, sale) => {
        return (
          sum +
          (sale.sold?.reduce((saleSum, soldItem) => {
            return (
              saleSum +
              (soldItem.menuItem?.Cost || 0) * (soldItem.Quantity || 0)
            );
          }, 0) || 0)
        );
      }, 0);

      const totalTransactions = sales.length;
      const totalItemsSold = sales.reduce((sum, sale) => {
        return (
          sum +
          (sale.sold?.reduce(
            (itemSum, soldItem) => itemSum + (soldItem.Quantity || 0),
            0
          ) || 0)
        );
      }, 0);

      return {
        sales,
        summary: {
          totalRevenue,
          totalTransactions,
          totalItemsSold,
          averageTransactionValue:
            totalTransactions > 0 ? totalRevenue / totalTransactions : 0,
        },
      };
    } catch (error) {
      console.error("Error fetching sales data:", error);
      throw new Error("Failed to fetch sales data");
    }
  }

  async createSale(email: string, saleData: any) {
    const { startDate, endDate, items } = saleData;

    return await prisma.$transaction(async (tx) => {
      // Create sale record
      const sale = await tx.sale.create({
        data: {
          Email: email,
          StartDate: new Date(startDate),
          EndDate: new Date(endDate),
        },
      });

      // Create sold items
      if (items && items.length > 0) {
        const soldData = items.map((item: any) => ({
          Email: email,
          StartDate: new Date(startDate),
          EndDate: new Date(endDate),
          MenuName: item.menuName,
          Quantity: item.quantity,
        }));

        await tx.sold.createMany({
          data: soldData,
        });
      }

      return sale;
    });
  }

  async getSalesByDateRange(email: string, startDate: string, endDate: string) {
    return await prisma.sale.findMany({
      where: {
        Email: email,
        StartDate: {
          gte: new Date(startDate),
        },
        EndDate: {
          lte: new Date(endDate),
        },
      },
      include: {
        sold: {
          include: {
            menuItem: true,
          },
        },
      },
    });
  }

  async getTopSellingItems(email: string, limit: number = 10) {
    const result = await prisma.$queryRaw`
      SELECT 
        s."MenuName",
        SUM(s."Quantity") as total_quantity,
        COUNT(*) as times_sold,
        m."Cost" as item_cost
      FROM "Sold" s
      JOIN "MenuItem" m ON s."Email" = m."Email" AND s."MenuName" = m."Name"
      WHERE s."Email" = ${email}
      GROUP BY s."MenuName", m."Cost"
      ORDER BY total_quantity DESC
      LIMIT ${limit}
    `;

    return result;
  }

  async getDailySalesReport(email: string, date: string) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await prisma.sale.findMany({
      where: {
        Email: email,
        StartDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        sold: {
          include: {
            menuItem: true,
          },
        },
      },
    });
  }
}

export const salesService = new SalesService();
