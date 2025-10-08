import { prisma } from "../config/database";

export class PurchaseService {
  // From API_populatePurchasePage.js
  async getPurchaseData(email: string, startDate?: string, endDate?: string) {
    try {
      const whereClause: any = { Email: email };

      if (startDate && endDate) {
        whereClause.DateTime = {
          gte: new Date(startDate),
          lte: new Date(endDate),
        };
      }

      const purchases = await prisma.purchase.findMany({
        where: whereClause,
        include: {
          includes: {
            include: {
              ingredient: true,
            },
          },
        },
        orderBy: { DateTime: "desc" },
      });

      // Calculate purchase metrics
      const totalSpent = purchases.reduce((sum, purchase) => {
        return (
          sum +
          (purchase.includes?.reduce((purchaseSum, includedItem) => {
            return (
              purchaseSum +
              (includedItem.ingredient?.Cost || 0) * (includedItem.Amount || 0)
            );
          }, 0) || 0)
        );
      }, 0);

      const totalPurchases = purchases.length;
      const totalItems = purchases.reduce((sum, purchase) => {
        return sum + (purchase.includes?.length || 0);
      }, 0);

      return {
        purchases,
        summary: {
          totalSpent,
          totalPurchases,
          totalItems,
          averagePurchaseAmount:
            totalPurchases > 0 ? totalSpent / totalPurchases : 0,
        },
      };
    } catch (error) {
      console.error("Error fetching purchase data:", error);
      throw new Error("Failed to fetch purchase data");
    }
  }

  async createPurchase(email: string, purchaseData: any) {
    const { dateTime, location, vendor, items } = purchaseData;

    return await prisma.$transaction(async (tx) => {
      // Create purchase record
      const purchase = await tx.purchase.create({
        data: {
          Email: email,
          DateTime: new Date(dateTime),
          Location: location,
          Vendor: vendor,
        },
      });

      // Create included items
      if (items && items.length > 0) {
        const includesData = items.map((item: any) => ({
          Email: email,
          DateTime: new Date(dateTime),
          Location: location,
          IngredientName: item.ingredientName,
          Amount: item.amount,
          Cost: item.cost,
        }));

        await tx.includes.createMany({
          data: includesData,
        });

        // Update inventory amounts
        for (const item of items) {
          const existingIngredient = await tx.ingredient.findFirst({
            where: {
              Email: email,
              Name: item.ingredientName,
            },
          });

          if (existingIngredient) {
            // Update existing ingredient amount
            await tx.ingredient.updateMany({
              where: {
                Email: email,
                Name: item.ingredientName,
              },
              data: {
                Amount: (existingIngredient.Amount || 0) + item.amount,
                Cost: item.cost, // Update with latest cost
              },
            });
          } else {
            // Create new ingredient
            await tx.ingredient.create({
              data: {
                Email: email,
                Name: item.ingredientName,
                Amount: item.amount,
                Cost: item.cost,
                AmountUnits: item.amountUnits || "units",
              },
            });
          }
        }
      }

      return purchase;
    });
  }

  async getPurchasesByVendor(email: string, vendor: string) {
    return await prisma.purchase.findMany({
      where: {
        Email: email,
        Vendor: vendor,
      },
      include: {
        includes: {
          include: {
            ingredient: true,
          },
        },
      },
      orderBy: { DateTime: "desc" },
    });
  }

  async getPurchasesByDateRange(
    email: string,
    startDate: string,
    endDate: string
  ) {
    return await prisma.purchase.findMany({
      where: {
        Email: email,
        DateTime: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: {
        includes: {
          include: {
            ingredient: true,
          },
        },
      },
    });
  }

  async getMonthlyPurchaseReport(email: string, year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    return await prisma.purchase.findMany({
      where: {
        Email: email,
        DateTime: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        includes: {
          include: {
            ingredient: true,
          },
        },
      },
    });
  }

  async getTopVendors(email: string, limit: number = 5) {
    const result = await prisma.$queryRaw`
      SELECT 
        "Vendor",
        COUNT(*) as purchase_count,
        SUM(
          COALESCE(
            (SELECT SUM(i."Amount" * i."Cost") 
             FROM "Includes" i 
             WHERE i."Email" = p."Email" 
               AND i."DateTime" = p."DateTime" 
               AND i."Location" = p."Location"), 0
          )
        ) as total_spent
      FROM "Purchase" p
      WHERE p."Email" = ${email}
        AND p."Vendor" IS NOT NULL
      GROUP BY "Vendor"
      ORDER BY total_spent DESC
      LIMIT ${limit}
    `;

    return result;
  }
}

export const purchaseService = new PurchaseService();
