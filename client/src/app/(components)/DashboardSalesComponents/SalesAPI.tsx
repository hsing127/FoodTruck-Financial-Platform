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
  
      setSales((prevSales) => [
        ...prevSales,
        { ...newSale, localSaleId: prevSales.length + 1001 },
      ]);
    } catch (error) {
      console.error("Error adding sale:", error);
    }
  };

  const addSoldItemAPI = async (saleId: number, soldItem: any) => {
    try {
      const response = await fetch(
        "https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/editTable",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tableName: "Sold",
            data: {
              Email: email,
              NewStartDate: soldItem.startDate,
              NewEndDate: soldItem.endDate,
              NewMenuName: soldItem.menuitemname,
              NewCount: soldItem.count,
            },
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to add sold item");
      }
  
    } catch (error) {
      console.error("Error adding sold item:", error);
    }
  };

  const updateSaleAPI = async (updatedSale: Sale) => {
    try {
        const payload = {
            tableName: "sale",
            data: {
                Email: email,
                StartDate: updatedSale.startDate,
                EndDate: updatedSale.endDate,
                NewRevenue: updatedSale.revenue,
            },
        };

        console.log("Sending updateSaleAPI request:", JSON.stringify(payload, null, 2));

        const response = await fetch(
            "https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/editTable",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            }
        );

        const responseData = await response.json();
        console.log("updateSaleAPI response:", responseData);

        if (!response.ok) {
            throw new Error("Failed to update sale");
        }

    } catch (error) {
        console.error("Error updating sale:", error);
    }
};

  
const updateSoldItemAPI = async (updatedSoldItem: any) => {
  try {
      const payload = {
          tableName: "Sold",
          data: {
              Email: email,
              StartDate: updatedSoldItem.startDate,
              EndDate: updatedSoldItem.endDate,
              MenuName: updatedSoldItem.menuitemname,
              NewCount: updatedSoldItem.count,
          },
      };

      console.log("Sending updateSoldItemAPI request:", JSON.stringify(payload, null, 2));

      const response = await fetch(
          "https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/editTable",
          {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
          }
      );

      const responseData = await response.json();
      console.log("updateSoldItemAPI response:", responseData);

      if (!response.ok) {
          throw new Error("Failed to update sold item");
      }

  } catch (error) {
      console.error("Error updating sold item:", error);
  }
};


  return {
    sales,
    setSales,
    loading,
    deleteSaleAPI,
    addSaleAPI,
    addSoldItemAPI,
    updateSaleAPI, 
    updateSoldItemAPI, 
  };
};
