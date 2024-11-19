import { useEffect, useState } from "react";

// Define your TypeScript interfaces
interface Ingredient {
  name: string;
  amount: number;
  units: string;
}

interface MenuItem {
  name: string;
  cost: number;
  ingredients: Ingredient[];
}

export const useMenuData = (email: string) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(
          "https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/data/menu",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const data = await response.json();

        let menuData;
        if (typeof data.body === "string") {
          menuData = JSON.parse(data.body);
        } else {
          menuData = data.body;
        }

        //Format the menu items into a usable structure
        const formattedMenuItems = Object.entries(menuData.menuItems).map(
          ([menuName, menuItem]: [string, any]) => ({
            name: menuName,
            cost: menuItem.cost,
            ingredients: menuItem.ingredients.map((ingredient: any) => ({
              name: ingredient.name,
              amount: ingredient.amount,
              units: ingredient.units,
            })),
          })
        );

        setMenuItems(formattedMenuItems);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [email]);

  return { menuItems, setMenuItems, loading };
};
