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
        let salesData;
        if (typeof data.body === "string") {
          salesData = JSON.parse(data.body);
        } else {
          salesData = data.body;
        }

        // Assign localSaleId sequentially to each sale item and format date
        const salesWithId = salesData.sales.map((sale: any, index: number) => {
          return {
            ...sale,
            localSaleId: index + 1001, // Start at 1001 and increment
            completeStartDate: sale.date,
            completeEndDate: sale.date,
            startDate: sale.date, // Use the date field as both start & end
            endDate: sale.date,
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

  // Function to delete a sale from API
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
            EndDate: sale.startDate,
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

  // Placeholder: Function to add a sale to API

  /*
  const addSaleAPI = async (newSale: Sale) => {
    try {
      const response = await fetch(
        "https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/addSale",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            table: "sale",
            Email: email,
            StartDate: newSale.startDate,
            EndDate: newSale.startDate,  
            Revenue: newSale.revenue,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSales((prevSales) => [...prevSales, newSale]);
      } else {
        console.error("Failed to add sale:", data.error);
      }
    } catch (error) {
      console.error("Error adding sale:", error);
    }
  };
  */

  // Placeholder: Function to edit a sale in API
  
  /*
  const editSaleAPI = async (updatedSale: Sale, originalSale: Sale) => {
    try {
      const response = await fetch(
        "https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/editSale",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            table: "sale",
            Email: email,
            NewStartDate: updatedSale.startDate,
            NewEndDate: updatedSale.startDate,
            NewRevenue: updatedSale.revenue,
            StartDate: originalSale.startDate,
            EndDate: originalSale.startDate,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSales((prevSales) =>
          prevSales.map((sale) =>
            sale.localSaleId === originalSale.localSaleId
              ? { ...sale, ...updatedSale }
              : sale
          )
        );
      } else {
        console.error("Failed to edit sale:", data.error);
      }
    } catch (error) {
      console.error("Error editing sale:", error);
    }
  };
  */

  return { sales, setSales, loading, deleteSaleAPI /*, addSaleAPI, editSaleAPI */ };
};
