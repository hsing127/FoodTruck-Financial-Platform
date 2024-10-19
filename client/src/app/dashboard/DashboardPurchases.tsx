// src/components/DashboardUploadFiles.tsx
import "@/app/globals.css";
import React from "react";
import DashboardLayout from "./DashboardWrapper";
import { motion } from "framer-motion";
import { Banknote, ShoppingCart, FileText, Store } from "lucide-react";
import ReceiptTable from "../(components)/DashboardPurchasesComponents/ReceiptTable";
import DashCardLong from "../(components)/DashboardHomeComponents/DashCardLong";

export const DashboardUploadFiles: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="outline outline-white outline-8 flex-1 relative border-white rounded-3xl border-[16px] overflow-hidden">
        <div className="max-w-[1800px] pt-2 mx-auto px-4 lg:px-6">
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
                  value="8"
                  color="bg-gray-100"
                />
                <DashCardLong
                  name="Total Spendings"
                  icon={Banknote}
                  value="$1,400"
                  color="bg-gray-100"
                  isPurple={true}
                />
                <DashCardLong
                  name="Average Cost/Receipt"
                  icon={ShoppingCart}
                  value="$175"
                  color="bg-gray-100"
                />
                <DashCardLong
                  name="Most Visited Store"
                  icon={Store}
                  value="Walmart"
                  color="bg-gray-100"
                  isPurple={true}
                />
              </div>
            </motion.div>
          </div>
          <ReceiptTable />
        </div>
      </div>
    </DashboardLayout>
  );
};
