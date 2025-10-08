import { prisma } from "../config/database";

export interface DeleteIngredientRequest {
  Email: string;
  Name: string;
}

export interface DeletePurchaseRequest {
  Email: string;
  DateTime: string;
  Location: string;
}

export interface DeleteIncludesRequest {
  Email: string;
  DateTime: string;
  Location: string;
  IngredientName: string;
}

export interface DeleteMenuItemRequest {
  Email: string;
  Name: string;
}

export interface DeleteSaleRequest {
  Email: string;
  StartDate: string;
  EndDate: string;
}

export interface DeleteSoldRequest {
  Email: string;
  StartDate: string;
  EndDate: string;
  MenuName: string;
}

export interface DeleteUsesRequest {
  Email: string;
  MenuName: string;
  IngredientName: string;
}

export interface DeleteOtherCostRequest {
  Email: string;
  CostDate: string;
  CostName: string;
}

export class DataService {
  // From API_deleteRow.js - Delete ingredients
  async deleteIngredient(data: DeleteIngredientRequest): Promise<void> {
    const { Email, Name } = data;

    await prisma.ingredient.deleteMany({
      where: {
        Email: Email,
        Name: Name,
      },
    });
  }

  // From API_deleteRow.js - Delete purchases
  async deletePurchase(data: DeletePurchaseRequest): Promise<void> {
    const { Email, DateTime, Location } = data;

    await prisma.purchase.deleteMany({
      where: {
        Email: Email,
        DateTime: new Date(DateTime),
        Location: Location,
      },
    });
  }

  // From API_deleteRow.js - Delete includes
  async deleteIncludes(data: DeleteIncludesRequest): Promise<void> {
    const { Email, DateTime, Location, IngredientName } = data;

    await prisma.includes.deleteMany({
      where: {
        Email: Email,
        DateTime: new Date(DateTime),
        Location: Location,
        IngredientName: IngredientName,
      },
    });
  }

  // From API_deleteRow.js - Delete menu item
  async deleteMenuItem(data: DeleteMenuItemRequest): Promise<void> {
    const { Email, Name } = data;

    await prisma.menuItem.deleteMany({
      where: {
        Email: Email,
        Name: Name,
      },
    });
  }

  // From API_deleteRow.js - Delete sale
  async deleteSale(data: DeleteSaleRequest): Promise<void> {
    const { Email, StartDate, EndDate } = data;

    await prisma.sale.deleteMany({
      where: {
        Email: Email,
        StartDate: new Date(StartDate),
        EndDate: new Date(EndDate),
      },
    });
  }

  // From API_deleteRow.js - Delete sold
  async deleteSold(data: DeleteSoldRequest): Promise<void> {
    const { Email, StartDate, EndDate, MenuName } = data;

    await prisma.sold.deleteMany({
      where: {
        Email: Email,
        StartDate: new Date(StartDate),
        EndDate: new Date(EndDate),
        MenuName: MenuName,
      },
    });
  }

  // From API_deleteRow.js - Delete uses
  async deleteUses(data: DeleteUsesRequest): Promise<void> {
    const { Email, MenuName, IngredientName } = data;

    await prisma.uses.deleteMany({
      where: {
        Email: Email,
        MenuName: MenuName,
        IngredientName: IngredientName,
      },
    });
  }

  // From API_deleteRow.js - Delete other cost
  async deleteOtherCost(data: DeleteOtherCostRequest): Promise<void> {
    const { Email, CostDate, CostName } = data;

    await prisma.otherCost.deleteMany({
      where: {
        email: Email,
        costdate: new Date(CostDate),
        costname: CostName,
      },
    });
  }

  // From API_updateTables.js - Update ingredients
  async updateIngredient(data: any) {
    const { Email, Name, newData } = data;

    return await prisma.ingredient.updateMany({
      where: {
        Email: Email,
        Name: Name,
      },
      data: newData,
    });
  }

  // From API_updateTables.js - Update purchases
  async updatePurchase(data: any) {
    const { Email, DateTime, Location, newData } = data;

    return await prisma.purchase.updateMany({
      where: {
        Email: Email,
        DateTime: new Date(DateTime),
        Location: Location,
      },
      data: newData,
    });
  }

  // From API_displayData.mjs - Get data for a specific table
  async getData(tableName: string, email: string) {
    switch (tableName.toLowerCase()) {
      case "ingredient":
        return await prisma.ingredient.findMany({
          where: { Email: email },
        });

      case "purchase":
        return await prisma.purchase.findMany({
          where: { Email: email },
        });

      case "menuitem":
        return await prisma.menuItem.findMany({
          where: { Email: email },
        });

      case "sale":
        return await prisma.sale.findMany({
          where: { Email: email },
        });

      case "uses":
        return await prisma.uses.findMany({
          where: { Email: email },
        });

      case "includes":
        return await prisma.includes.findMany({
          where: { Email: email },
        });

      case "sold":
        return await prisma.sold.findMany({
          where: { Email: email },
        });

      default:
        throw new Error(`Table ${tableName} not supported`);
    }
  }

  // From API_DBpopulator.mjs - Populate database with sample data
  async populateDatabase(email: string) {
    try {
      // Sample ingredients
      const ingredients = [
        {
          Email: email,
          Name: "Tomatoes",
          Cost: 2.5,
          Amount: 10,
          AmountUnits: "lbs",
        },
        {
          Email: email,
          Name: "Lettuce",
          Cost: 1.8,
          Amount: 5,
          AmountUnits: "heads",
        },
        {
          Email: email,
          Name: "Ground Beef",
          Cost: 8.0,
          Amount: 3,
          AmountUnits: "lbs",
        },
      ];

      // Sample menu items
      const menuItems = [
        { Email: email, Name: "Burger", Cost: 12.99 },
        { Email: email, Name: "Salad", Cost: 8.99 },
        { Email: email, Name: "Taco", Cost: 3.99 },
      ];

      // Insert ingredients
      await prisma.ingredient.createMany({
        data: ingredients,
        skipDuplicates: true,
      });

      // Insert menu items
      await prisma.menuItem.createMany({
        data: menuItems,
        skipDuplicates: true,
      });

      return {
        message: "Database populated successfully",
        ingredientsAdded: ingredients.length,
        menuItemsAdded: menuItems.length,
      };
    } catch (error) {
      console.error("Error populating database:", error);
      throw new Error("Failed to populate database");
    }
  }
}

export const dataService = new DataService();
