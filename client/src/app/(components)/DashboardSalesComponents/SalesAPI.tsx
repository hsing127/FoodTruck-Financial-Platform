import { useEffect, useState } from "react";
import { Sale } from "@/app/types/types";

export const useSalesData = (email: string) => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(
          "https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/sales",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const data = await response.json();

        // Check if the response body is a string and parse it if necessary
        let salesData;
        if (typeof data.body === "string") {
          salesData = JSON.parse(data.body);
        } else {
          salesData = data.body;
        }

        // Process and format sales data with unique IDs and properly formatted dates
        const salesWithId = salesData.sales.map((sale: any, index: number) => {
          return {
            ...sale,
            localSaleId: index + 1001, // Assign unique localSaleId
            completeStartDate: sale.StartDate, // Ensure consistent date naming
            completeEndDate: sale.EndDate || sale.StartDate, // Fallback to StartDate if no EndDate
            startDate: sale.StartDate, // Use StartDate from DB
            endDate: sale.EndDate || sale.StartDate, // Use EndDate if available, otherwise fallback to StartDate
          };
        });

        // Set sales data after processing
        setSales(salesWithId);
      } catch (error) {
        console.error("Error fetching sales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [email]);

  // Function to delete a sale from the API
  const deleteSaleAPI = async (sale: Sale) => {
    try {
      const response = await fetch(
        "https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/deleteRow",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            table: "sale",
            Email: email,
            StartDate: sale.startDate,
            EndDate: sale.endDate,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSales((prevSales) =>
          prevSales.filter((s) => s.startDate !== sale.startDate)
        );
      } else {
        console.error("Failed to delete sale:", data.error);
      }
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
  };

  const addSaleAPI = async (newSale: Sale) => {
    try {  
      // Step 1: Add the new sale to the "Sale" table
      const saleResponse = await fetch(
        "https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/editTable",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: "sale",
            Email: email,
            NewStartDate: newSale.startDate,
            NewEndDate: newSale.endDate,
            NewRevenue: newSale.revenue,
          }),
        }
      );
  
      if (!saleResponse.ok) {
        throw new Error("Failed to add sale");
      }
  
      console.log("Sale added successfully");
  
      // Step 2: Add each sold item associated with the sale to the "Sold" table
      for (const item of newSale.details) {
        const soldResponse = await fetch(
          "https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/editTable",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              table: "sold",
              Email: email,
              NewStartDate: newSale.startDate,
              NewEndDate: newSale.endDate,
              NewMenuName: item.menuitemname,
              NewCount: item.count,
            }),
          }
        );
  
        if (!soldResponse.ok) {
          throw new Error(`Failed to add sold item: ${item.menuitemname}`);
        }
      }
  
      console.log("All sold items added successfully");
  
      // Step 3: Update state to include the new sale
      setSales((prevSales) => [
        ...prevSales,
        { ...newSale, localSaleId: prevSales.length + 1001 },
      ]);
    } catch (error) {
      console.error("Error adding sale and sold items:", error);
    }
  };
  

  return { sales, setSales, loading, deleteSaleAPI };
};
