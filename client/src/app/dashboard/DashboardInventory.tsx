import "@/app/globals.css";
import React from "react";
import DashboardLayout from "./DashboardWrapper";
import { motion } from "framer-motion";
import {
  Banknote,
  ShoppingCart,
  FileText,
  Store,
  AlertCircle,
  Box,
  DollarSign,
} from "lucide-react";
import InventoryTable from "../(components)/DashboardInventoryComponents/InventoryTable";
import DashCardLong from "../(components)/DashboardHomeComponents/DashCardLong";

export const DashboardInventory: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="outline outline-white outline-8 flex-1 relative border-white rounded-3xl border-[16px] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
          <div className="pt-2 mx-auto ">
            {/* First row of dashboard cards */}
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4 mt-4"
              initial={{ opacity: 0, y: 20 }} // Animation for appearance
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Inventory Dashboard Cards */}
              <DashCardLong
                name="Total Inventory Items"
                icon={FileText}
                value="5"
                color="bg-gray-100"
              />
              <DashCardLong
                name="Low Stock Items"
                icon={AlertCircle}
                value="2"
                color="bg-gray-100"
                isPurple={true}
              />
              <DashCardLong
                name="Out of Stock Items"
                icon={Box}
                value="1"
                color="bg-gray-100"
              />
              <DashCardLong
                name="Total Inventory Value"
                icon={DollarSign}
                value="$10,000"
                color="bg-gray-100"
                isPurple={true}
              />
            </motion.div>
          </div>
          <InventoryTable />
        </div>
      </div>
    </DashboardLayout>
  );
};
