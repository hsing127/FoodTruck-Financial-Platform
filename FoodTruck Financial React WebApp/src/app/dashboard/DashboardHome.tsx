import "@/app/globals.css";
import React from "react";
import DashboardLayout from "../dashboard/DashboardWrapper";
import DashCardSmall from "../(components)/DashCardSmall/DashCardSmall";
import DashCardLong from "../(components)/DashCardSmall/DashCardLong";
import DistributionChart from "../(components)/DashAreaChart/AreaChart";
import SalesOverview from "../(components)/SalesOverviewChart/SalesOverview";

import { motion } from "framer-motion";
import { TrendingUp, ShoppingCart, Banknote, Landmark } from "lucide-react";

export const DashboardHome: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="outline outline-white outline-8 flex-1 relative z-10 border-white rounded-3xl border-[16px] overflow-hidden">
        <div className=" mx-auto py-2 px-4 lg:px-6">
          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="col-span-1 lg:col-span-1">
              <DashCardSmall
                name="Total Sales"
                icon={Banknote}
                value="$20,000"
                color="bg-gray-100"
                withToggleButtons={true}
                monthlyValue="$3000"
                yearlyValue="$36000"
              />
            </div>

            <div className="col-span-1 lg:col-span-1">
              <DashCardSmall
                name="Products"
                icon={ShoppingCart}
                value="1,200"
                color="bg-gray-100"
                withEllipse={true}
              />
            </div>

            <div className="col-span-1 lg:col-span-1 space-y-[20px] sm:col-span-2">
              <DashCardLong
                name="Revenue Growth"
                icon={TrendingUp}
                value="8%"
                color="bg-gray-100"
              />
              <DashCardLong
                name="Profits"
                icon={Landmark}
                value="$550"
                color="bg-gray-100"
              />
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-[2.03fr_1fr] gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <SalesOverview />
            <DistributionChart />
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};
