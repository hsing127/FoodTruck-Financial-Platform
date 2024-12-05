import { useEffect, useState } from "react";
import { Sale } from "@/app/types/types";

export const useSalesData = (email: string) => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(
          "https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/data/sales",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const data = await response.json();
        let salesData;
        if (typeof data.body === "string") {
          salesData = JSON.parse(data.body);
        } else {
          salesData = data.body;
        }

        // Assign localSaleId sequentially to each sale item and format date
        const salesWithId = salesData.sales.map((sale: any, index: number) => {
          const startDateObj = new Date(sale.StartDate);
          const endDateObj = new Date(sale.EndDate);
          return {
            ...sale,
            localSaleId: index + 1001, // Start at 1001 and increment
            completeStartDate: sale.StartDate,
            completeEndDate: sale.EndDate,
            startDate: startDateObj.toLocaleDateString(), // Format date
            endDate: endDateObj.toLocaleDateString(), // Format date
          };
        });

        setSales(salesWithId);
      } catch (error) {
        console.error("Error fetching sales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [email]);

  // Function to add a new sale to the API
  const addSaleAPI = async (email: string, newSale: Sale) => {
    try {
      const response = await fetch(
        "https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/data/addTable",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            table: "sales",
            body: {
              Email: email,
              StartDate: newSale.startDate,
              EndDate: newSale.endDate,
              Revenue: newSale.revenue,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add sale to API");
      }

      const data = await response.json();
      console.log("Sale added successfully:", data);

      // Update local state with the new sale
      setSales((prevSales) => [
        ...prevSales,
        {
          ...newSale,
          localSaleId: prevSales.length + 1001, // Generate new ID
        },
      ]);

      return data;
    } catch (error) {
      console.error("Error adding sale:", error);
      throw new Error("Failed to add sale to API");
    }
  };

  // Function to edit an existing sale in the API
  const editSaleAPI = async (
    email: string,
    updatedSale: Sale,
    originalSale: Sale
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
            table: "sales",
            body: {
              Email: email,
              NewStartDate: updatedSale.startDate,
              NewEndDate: updatedSale.endDate,
              NewRevenue: updatedSale.revenue,
              StartDate: originalSale.startDate,
              EndDate: originalSale.endDate,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit sale in API");
      }

      const data = await response.json();
      console.log("Sale updated successfully:", data);

      // Update local state with the updated sale
      setSales((prevSales) =>
        prevSales.map((sale) =>
          sale.localSaleId === originalSale.localSaleId
            ? { ...sale, ...updatedSale }
            : sale
        )
      );

      return data;
    } catch (error) {
      console.error("Error editing sale:", error);
      throw new Error("Failed to edit sale in API");
    }
  };

  return { sales, setSales, loading, addSaleAPI, editSaleAPI };
};
