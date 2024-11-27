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

  return { sales, setSales, loading };
};
