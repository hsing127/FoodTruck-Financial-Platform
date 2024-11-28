import { useEffect, useState } from "react";
import { Receipt } from "@/app/types/types";

export const useReceiptsData = (email: string) => {
  const [areceipts, asetReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await fetch(
          "https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/data/purchases",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const data = await response.json();

        let purchasesData;
        if (typeof data.body === "string") {
          purchasesData = JSON.parse(data.body);
        } else {
          purchasesData = data.body;
        }

        // Assign localReceiptId sequentially to each purchase item and format date/time
        const receiptsWithId = purchasesData.purchases.map(
          (receipt: any, index: number) => {
            const dateObj = new Date(receipt.date);
            return {
              ...receipt,
              localReceiptId: index + 1001, // Start at 1001 and increment
              date: dateObj.toLocaleDateString(), // Format date
              time: dateObj.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }), // Format time
            };
          }
        );

        asetReceipts(receiptsWithId);
      } catch (error) {
        console.error("Error fetching receipts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, [email]);

  // Function to edit a receipt in the API
  const editReceiptAPI = async (
    email: string,
    updatedReceipt: Receipt,
    originalReceipt: Receipt
  ) => {
    try {
      const response = await fetch(
        "https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/data/editTable",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            table: "purchases",
            body: [
              {
                Email: email,
                NewDateTime: updatedReceipt.date + " " + updatedReceipt.time,
                NewLocation: updatedReceipt.location,
                NewCost: updatedReceipt.cost,
                DateTime: originalReceipt.date + " " + originalReceipt.time,
                Location: originalReceipt.location,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit receipt in API");
      }

      const data = await response.json();
      console.log("Receipt updated successfully:", data);

      // Optionally update the state with the new receipt
      asetReceipts((prevReceipts) =>
        prevReceipts.map((receipt) =>
          receipt.localReceiptId === originalReceipt.localReceiptId
            ? { ...receipt, ...updatedReceipt }
            : receipt
        )
      );

      return data;
    } catch (error) {
      console.error("Error editing receipt:", error);
      throw new Error("Failed to edit receipt in API");
    }
  };

  // Function to add a receipt to the API
  const addReceiptAPI = async (email: string, newReceipt: Receipt) => {
    try {
      const response = await fetch(
        "https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/data/addData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            table: "purchases",
            body: [
              {
                DateTime: newReceipt.date + " " + newReceipt.time,
                Location: newReceipt.location,
                Cost: newReceipt.cost,
                Email: email,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add receipt to API");
      }

      const data = await response.json();
      console.log("Receipt added successfully:", data);

      // Optionally update the state with the new receipt
      asetReceipts((prevReceipts) => [
        ...prevReceipts,
        {
          ...newReceipt,
          localReceiptId: prevReceipts.length + 1001, // Assign a new unique ID
        },
      ]);

      return data;
    } catch (error) {
      console.error("Error adding receipt:", error);
      throw new Error("Failed to add receipt to API");
    }
  };

  return { areceipts, asetReceipts, loading, editReceiptAPI, addReceiptAPI };
};
