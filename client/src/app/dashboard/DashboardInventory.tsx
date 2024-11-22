import "@/app/globals.css";
import React, { useMemo } from "react";
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
import { useInventoryData } from "../(components)/DashboardInventoryComponents/InventoryApi";

export const DashboardInventory: React.FC = () => {
  const { inventory, setInventory } = useInventoryData("ajwitt2@asu.edu");

  // Compute Total Inventory Items
  const totalInventoryItems = useMemo(() => inventory.length, [inventory]);

  // Compute Low Stock Items
  const lowStockItems = useMemo(() => {
    const threshold = 5; // Define your threshold
    return inventory.filter((item) => parseFloat(item.Amount) < threshold)
      .length;
  }, [inventory]);

  // Compute Out of Stock Items
  const outOfStockItems = useMemo(() => {
    return inventory.filter((item) => parseFloat(item.Amount) === 0).length;
  }, [inventory]);

  // Compute Total Inventory Value
  const totalInventoryValue = useMemo(() => {
    return "$10,000"; //placeholder
  }, []);

  return (
    <DashboardLayout>
      <div className="outline outline-white outline-8 flex-1 relative border-white rounded-3xl border-[16px] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
          <div className="pt-2 mx-auto ">
            {/* Dashboard Cards Row */}
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 mb-4 mt-4"
              initial={{ opacity: 0, y: 20 }} // Animation for appearance
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Inventory Dashboard Cards */}
              <div className="col-span-1 lg:col-span-1 space-y-[20px] sm:space-y-0 sm:grid sm:grid-cols-2 sm:col-span-2 lg:grid-cols-4 gap-4">
                <DashCardLong
                  name="Total Inventory Items"
                  icon={FileText}
                  value={totalInventoryItems}
                  color="bg-gray-100"
                />
                <DashCardLong
                  name="Low Stock Items"
                  icon={AlertCircle}
                  value={lowStockItems}
                  color="bg-gray-100"
                  isPurple={true}
                />
                <DashCardLong
                  name="Out of Stock Items"
                  icon={Box}
                  value={outOfStockItems}
                  color="bg-gray-100"
                />
                <DashCardLong
                  name="Total Inventory Value"
                  icon={DollarSign}
                  value={totalInventoryValue}
                  color="bg-gray-100"
                  isPurple={true}
                />
              </div>
            </motion.div>
          </div>
          <InventoryTable inventory={inventory} setInventory={setInventory} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardInventory;
