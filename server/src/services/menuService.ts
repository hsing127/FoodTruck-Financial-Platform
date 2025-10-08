import { prisma } from "../config/database";

export class MenuService {
  // From API_populateMenu.mjs
  async getMenuWithIngredients(email: string) {
    try {
      const query = `
        SELECT 
          m."Name" AS menu_item_name,
          m."Cost" AS menu_item_cost,
          u."IngredientName" AS ingredient_name,
          u."Amount" AS ingredient_amount,
          u."AmountUnits" AS ingredient_units
        FROM 
          "MenuItem" m
        LEFT JOIN 
          "Uses" u ON m."Email" = u."Email" AND m."Name" = u."MenuName"
        WHERE 
          m."Email" = $1;
      `;

      const result = await prisma.$queryRawUnsafe(query, email);

      // Format the results
      const menuItems: any = {};
      (result as any[]).forEach((row: any) => {
        const {
          menu_item_name,
          menu_item_cost,
          ingredient_name,
          ingredient_amount,
          ingredient_units,
        } = row;

        if (!menuItems[menu_item_name]) {
          menuItems[menu_item_name] = {
            name: menu_item_name,
            cost: menu_item_cost,
            ingredients: [],
          };
        }

        if (ingredient_name) {
          menuItems[menu_item_name].ingredients.push({
            name: ingredient_name,
            amount: ingredient_amount,
            units: ingredient_units,
          });
        }
      });

      return Object.values(menuItems);
    } catch (error) {
      console.error("Error fetching menu:", error);
      throw new Error("Failed to fetch menu data");
    }
  }

  async getMenuItems(email: string) {
    return await prisma.menuItem.findMany({
      where: { Email: email },
      include: {
        uses: {
          include: {
            ingredient: true,
          },
        },
      },
    });
  }

  async createMenuItem(email: string, menuData: any) {
    const { name, cost, ingredients } = menuData;

    return await prisma.$transaction(async (tx) => {
      // Create menu item
      const menuItem = await tx.menuItem.create({
        data: {
          Email: email,
          Name: name,
          Cost: cost,
        },
      });

      // Create uses relationships for ingredients
      if (ingredients && ingredients.length > 0) {
        const usesData = ingredients.map((ingredient: any) => ({
          Email: email,
          MenuName: name,
          IngredientName: ingredient.name,
          Amount: ingredient.amount,
          AmountUnits: ingredient.units || "units",
        }));

        await tx.uses.createMany({
          data: usesData,
        });
      }

      return menuItem;
    });
  }

  async updateMenuItem(email: string, menuName: string, updateData: any) {
    return await prisma.menuItem.updateMany({
      where: {
        Email: email,
        Name: menuName,
      },
      data: updateData,
    });
  }

  async deleteMenuItem(email: string, menuName: string) {
    return await prisma.$transaction(async (tx) => {
      // Delete uses relationships first
      await tx.uses.deleteMany({
        where: {
          Email: email,
          MenuName: menuName,
        },
      });

      // Delete menu item
      await tx.menuItem.deleteMany({
        where: {
          Email: email,
          Name: menuName,
        },
      });
    });
  }
}

export const menuService = new MenuService();
