import "@/app/globals.css";
import React, { useMemo } from "react";
import DashboardLayout from "./DashboardWrapper";
import { motion } from "framer-motion";
import { Banknote, ShoppingCart, FileText, Store } from "lucide-react";
import SaleTable from "../(components)/DashboardSalesComponents/SaleTable";
import DashCardLong from "../(components)/DashboardHomeComponents/DashCardLong";
import { useSalesData } from "../(components)/DashboardSalesComponents/SalesAPI";

export const DashboardSales: React.FC = () => {
  const { sales, setSales } = useSalesData("ajwitt2@asu.edu");

  // Compute Total Sales
  const totalSales = useMemo(() => sales.length, [sales]);

  // Compute Total Earnings
  const totalEarnings = useMemo(() => {
    return sales.reduce((acc, sale) => {
      const revenue = parseFloat(sale.revenue.replace("$", ""));
      return acc + (isNaN(revenue) ? 0 : revenue);
    }, 0);
  }, [sales]);

  // Compute Average Revenue per Sale
  const averageRevenuePerSale = useMemo(() => {
    if (totalSales === 0) return "0.00";
    return (totalEarnings / totalSales).toFixed(2);
  }, [totalEarnings, totalSales]);

  // Compute Most Bought Item
  const mostBoughtItem = useMemo(() => {
    if (sales.length === 0) return "N/A";
    const itemCount: { [key: string]: number } = {};
    sales.forEach((sale) => {
      sale.details.forEach((detail) => {
        itemCount[detail.menuitemname] =
          (itemCount[detail.menuitemname] || 0) + detail.count;
      });
    });
    const sortedItems = Object.entries(itemCount).sort((a, b) => b[1] - a[1]);
    return sortedItems[0]?.[0] || "N/A";
  }, [sales]);

  return (
    <DashboardLayout>
      <div className="outline outline-white outline-8 flex-1 relative border-white rounded-3xl border-[16px] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
          <div className="pt-2 mx-auto ">
            {/* First row of dashboard cards */}
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 mb-4 mt-4"
              initial={{ opacity: 0, y: 20 }} // Animation for appearance
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Sales Dashboard Cards */}
              <div className="col-span-1 lg:col-span-1 space-y-[20px] sm:space-y-0 sm:grid sm:grid-cols-2 sm:col-span-2 lg:grid-cols-4 gap-4">
                <DashCardLong
                  name="Total Sales"
                  icon={FileText}
                  value={totalSales}
                  color="bg-gray-100"
                />
                <DashCardLong
                  name="Total Earnings"
                  icon={Banknote}
                  value={`$${totalEarnings.toLocaleString()}`}
                  color="bg-gray-100"
                  isPurple={true}
                />
                <DashCardLong
                  name="Average Revenue/Sale"
                  icon={ShoppingCart}
                  value={`$${averageRevenuePerSale}`}
                  color="bg-gray-100"
                />
                <DashCardLong
                  name="Most Bought Item"
                  icon={Store}
                  value={mostBoughtItem}
                  color="bg-gray-100"
                  isPurple={true}
                />
              </div>
            </motion.div>
          </div>
          <SaleTable sales={sales} setSales={setSales} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSales;
