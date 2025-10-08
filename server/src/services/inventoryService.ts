import { prisma } from "../config/database";

export class InventoryService {
  // From API_populateInventoryPage.js
  async getInventoryData(email: string) {
    try {
      const ingredients = await prisma.ingredient.findMany({
        where: { Email: email },
        orderBy: { Name: "asc" },
      });

      // Calculate additional inventory metrics
      const totalValue = ingredients.reduce(
        (sum, ingredient) => sum + (ingredient.Cost || 0),
        0
      );
      const lowStockItems = ingredients.filter(
        (ingredient) => (ingredient.Amount || 0) < 5
      );

      return {
        ingredients,
        summary: {
          totalItems: ingredients.length,
          totalValue: totalValue,
          lowStockItems: lowStockItems.length,
          lowStockDetails: lowStockItems,
        },
      };
    } catch (error) {
      console.error("Error fetching inventory:", error);
      throw new Error("Failed to fetch inventory data");
    }
  }

  async addIngredient(email: string, ingredientData: any) {
    const { name, cost, amount, amountUnits, description } = ingredientData;

    return await prisma.ingredient.create({
      data: {
        Email: email,
        Name: name,
        Cost: cost,
        Amount: amount,
        AmountUnits: amountUnits || "units",
        Description: description,
      },
    });
  }

  async updateIngredient(
    email: string,
    ingredientName: string,
    updateData: any
  ) {
    return await prisma.ingredient.updateMany({
      where: {
        Email: email,
        Name: ingredientName,
      },
      data: updateData,
    });
  }

  async deleteIngredient(email: string, ingredientName: string) {
    return await prisma.ingredient.deleteMany({
      where: {
        Email: email,
        Name: ingredientName,
      },
    });
  }

  async updateInventoryStock(
    email: string,
    ingredientName: string,
    quantityChange: number
  ) {
    const ingredient = await prisma.ingredient.findFirst({
      where: {
        Email: email,
        Name: ingredientName,
      },
    });

    if (!ingredient) {
      throw new Error("Ingredient not found");
    }

    const newAmount = (ingredient.Amount || 0) + quantityChange;

    if (newAmount < 0) {
      throw new Error("Insufficient stock");
    }

    return await prisma.ingredient.updateMany({
      where: {
        Email: email,
        Name: ingredientName,
      },
      data: {
        Amount: newAmount,
      },
    });
  }

  async getLowStockAlert(email: string, threshold: number = 5) {
    return await prisma.ingredient.findMany({
      where: {
        Email: email,
        Amount: {
          lt: threshold,
        },
      },
      orderBy: { Amount: "asc" },
    });
  }
}

export const inventoryService = new InventoryService();
