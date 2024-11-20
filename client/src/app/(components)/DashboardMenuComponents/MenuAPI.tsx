import { useEffect, useState } from "react";
import * as Icons from "lucide-react";

interface Ingredient {
  ingredient: string;
  quantity: number;
  units: string;
  price: string;
}

interface MenuItem {
  id: number;
  image: JSX.Element;
  name: string;
  price: string;
  details?: string;
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

        //Parse data if `body` is a string
        let menuData;
        if (typeof data.body === "string") {
          menuData = JSON.parse(data.body);
        } else {
          menuData = data.body;
        }

        //Helper to get an icon dynamically
        const getIcon = (name: string): JSX.Element => {
          const formattedName = name.replace(/\s+/g, ""); // Remove spaces
          const IconComponent = (Icons as any)[formattedName]; // Lookup icon by name
          return IconComponent ? <IconComponent size={44} /> : <Icons.Pizza size={44} />; // Default to Pizza
        };

        // Transform API data into desired format
        const formattedMenuItems: MenuItem[] = Object.entries(menuData.menuItems).map(
          ([menuName, menuItem]: [string, any], index: number) => ({
            id: index + 1,
            image: getIcon("pizza"), // Dynamically determine the icon
            name: menuName,
            price: "$1", // Placeholder price
            details: menuItem.description || "No description available.",
            ingredients: menuItem.ingredients.map((ingredient: any) => ({
              ingredient: ingredient.name,
              quantity: ingredient.amount,
              units: ingredient.units,
              price: "$1", // Placeholder price for ingredients
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

  return [menuItems, setMenuItems, loading] as const;
};
