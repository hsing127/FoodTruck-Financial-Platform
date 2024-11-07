import "@/app/globals.css";
import React from "react";
import DashboardLayout from "./DashboardWrapper";
import { motion } from "framer-motion";
import { Pizza, Star, DollarSign, Layers } from "lucide-react"; // Lucide icons for menu stats
import DashCardLong from "../(components)/DashboardHomeComponents/DashCardLong";
import MenuTable from "../(components)/DashboardMenuComponents/MenuTable";

export const DashboardMenu: React.FC = () => {
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
              {/* Menu Dashboard Cards */}
              <div className="col-span-1 lg:col-span-1 space-y-[20px] sm:space-y-0 sm:grid sm:grid-cols-2 sm:col-span-2 lg:grid-cols-4 gap-4">
                <DashCardLong
                  name="Total Menu Items"
                  icon={Pizza}
                  value="50"
                  color="bg-gray-100"
                />
                <DashCardLong
                  name="Most Popular Item"
                  icon={Star}
                  value="Margherita Pizza"
                  color="bg-gray-100"
                  isPurple={true}
                />
                <DashCardLong
                  name="Average Price"
                  icon={DollarSign}
                  value="$12"
                  color="bg-gray-100"
                />
                <DashCardLong
                  name="New Foods"
                  icon={Layers}
                  value="8"
                  color="bg-gray-100"
                  isPurple={true}
                />
              </div>
            </motion.div>
          </div>
          <MenuTable />
        </div>
      </div>
    </DashboardLayout>
  );
};
