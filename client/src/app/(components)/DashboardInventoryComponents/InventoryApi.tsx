import { useEffect, useState } from "react";
import { InventoryItem } from "@/app/types/types";

export const useInventoryData = (email: string) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(
          "https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/data/inventory",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch inventory data");
        }

        const data = await response.json();

        let inventoryData;
        if (typeof data.body === "string") {
          inventoryData = JSON.parse(data.body);
        } else {
          inventoryData = data.body;
        }

        // Ensure inventoryData.inventory exists and is an array
        if (!Array.isArray(inventoryData.inventory)) {
          throw new Error("Invalid inventory data format");
        }

        const inventoryWithId = inventoryData.inventory.map(
          (item: any, index: number) => ({
            ...item,
            id: item.uniqueId || index + 1001, // Prefer API-provided uniqueId
          })
        );

        setInventory(inventoryWithId);
      } catch (err: any) {
        console.error("Error fetching inventory:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [email]);

  return { inventory, setInventory, loading, error };
};
