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

// Custom hook to add inventory data
export const useAddInventoryData = (
  inventoryItem: InventoryItem | null,
  email: string
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const addInventory = async (
      inventoryItem: InventoryItem,
      email: string
    ) => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/data/addData",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              table: "ingredient",
              body: [{ Email: email, ...inventoryItem }],
            }),
          }
        );
        let res = await response.json();
        if (!response.ok) {
          console.log("error");
          throw new Error("Failed to add inventory data");
        } else {
          if (res.statusCode == 500) {
            alert("Something went wrong.");
          } else {
            alert("Successfully Inserted.");
            console.log("Inventory added successfully:", res);
          }
        }
      } catch (err: any) {
        console.error("Error adding inventory:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (inventoryItem) {
      addInventory(inventoryItem, email);
    }
  }, [inventoryItem, email]);

  return { loading, error };
};

export const useEditInventoryData = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const editInventory = async (
      oldItem: InventoryItem,
      newItem: InventoryItem,
      email: string
    ) => {
      setLoading(true);
        try {
          
        console.log("Original item:", oldItem);
        console.log("Edited item:", newItem);
        const response = await fetch(
          "https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/data/editTable",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              table: "ingredient",
              body: 
                {
                  Email: email,
                  NewName: newItem.Name,
                  NewAmount: newItem.Amount,
                  NewAmountUnits: newItem.AmountUnits,
                  Name: oldItem.Name,
                },
            }),
          }
        );
        const res = await response.json();
        if (!response.ok || res.statusCode === 500) {
          throw new Error("Failed to edit inventory data");
        }
        alert("Successfully Updated.");
        console.log("Inventory edited successfully:", res);
      } catch (err: any) {
        console.error("Error editing inventory:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
  
    return { editInventory, loading, error };
  };
  
  