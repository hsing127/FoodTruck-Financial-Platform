import "@/app/globals.css";
import React, { useMemo } from "react";
import DashboardLayout from "./DashboardWrapper";
import { motion } from "framer-motion";
import { Banknote, ShoppingCart, FileText, Store } from "lucide-react";
import ReceiptTable from "../(components)/DashboardPurchasesComponents/ReceiptTable";
import DashCardLong from "../(components)/DashboardHomeComponents/DashCardLong";
import { useReceiptsData } from "../(components)/DashboardPurchasesComponents/ReceiptAPI";

export const DashboardPurchases: React.FC = () => {
  const { areceipts, asetReceipts } = useReceiptsData("ajwitt2@asu.edu");

  // Compute Total Receipts
  const totalReceipts = useMemo(() => areceipts.length, [areceipts]);

  // Compute Total Spendings
  const totalSpendings = useMemo(() => {
    return areceipts.reduce((acc, receipt) => {
      const cost = parseFloat(receipt.cost.replace("$", ""));
      return acc + (isNaN(cost) ? 0 : cost);
    }, 0);
  }, [areceipts]);

  // Compute Average Cost per Receipt
  const averageCostPerReceipt = useMemo(() => {
    if (totalReceipts === 0) return "0.00";
    return (totalSpendings / totalReceipts).toFixed(2);
  }, [totalSpendings, totalReceipts]);

  // Compute Most Visited Store
  const mostVisitedStore = useMemo(() => {
    if (areceipts.length === 0) return "N/A";
    const storeCount: { [key: string]: number } = {};
    areceipts.forEach((areceipt) => {
      storeCount[areceipt.location] = (storeCount[areceipt.location] || 0) + 1;
    });
    const sortedStores = Object.entries(storeCount).sort((a, b) => b[1] - a[1]);
    return sortedStores[0]?.[0] || "N/A";
  }, [areceipts]);

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
              {/* Receipt Dashboard Cards */}
              <div className="col-span-1 lg:col-span-1 space-y-[20px] sm:space-y-0 sm:grid sm:grid-cols-2 sm:col-span-2 lg:grid-cols-4 gap-4">
                <DashCardLong
                  name="Total Receipts"
                  icon={FileText}
                  value={totalReceipts}
                  color="bg-gray-100"
                />
                <DashCardLong
                  name="Total Spendings"
                  icon={Banknote}
                  value={`$${totalSpendings.toLocaleString()}`}
                  color="bg-gray-100"
                  isPurple={true}
                />
                <DashCardLong
                  name="Average Cost/Receipt"
                  icon={ShoppingCart}
                  value={`$${averageCostPerReceipt}`}
                  color="bg-gray-100"
                />
                <DashCardLong
                  name="Most Visited Store"
                  icon={Store}
                  value={mostVisitedStore}
                  color="bg-gray-100"
                  isPurple={true}
                />
              </div>
            </motion.div>
          </div>
          <ReceiptTable receipts={areceipts} setReceipts={asetReceipts} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPurchases;
