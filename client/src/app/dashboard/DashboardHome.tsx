import "@/app/globals.css";
import React from "react";
import DashboardLayout from "../dashboard/DashboardWrapper";
import DashCardSmall from "../(components)/DashboardHomeComponents/DashCardSmall";
import DashCardLong from "../(components)/DashboardHomeComponents/DashCardLong";
import DistributionChart from "../(components)/DashboardHomeComponents/AreaChart";
import SalesOverview from "../(components)/DashboardHomeComponents/SalesOverview";
import DashBarChart from "../(components)/DashboardHomeComponents/DashBarChart";

import { motion } from "framer-motion";
import { TrendingUp, ShoppingCart, Banknote, Landmark } from "lucide-react";

export const DashboardHome: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="outline outline-white outline-8 flex-1 relative border-white rounded-3xl border-[16px] overflow-hidden">
        {/* Main dashboard grid */}
        <div className="max-w-[1600px] pt-2 mx-auto px-4 lg:px-6">
          {/* First row of dashboard cards */}
          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-4 mt-4"
            initial={{ opacity: 0, y: 20 }} // Animation for appearance
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Total Sales card */}
            <div className="col-span-1 lg:col-span-1">
              <DashCardSmall
                name="Total Sales"
                icon={Banknote}
                value="$20,000"
                color="bg-gray-100"
                withToggleButtons={true}
                monthlyValue="$3000"
                yearlyValue="$36000"
                isTrendingUp={true} // Indicates trend direction
              />
            </div>

            {/* Products card */}
            <div className="col-span-1 lg:col-span-1">
              <DashCardSmall
                name="Products"
                icon={ShoppingCart}
                value="1,200"
                color="bg-gray-100"
                withEllipse={true} // Adds a visual decoration
                isTrendingUp={false} // Indicates trend direction
              />
            </div>

            {/* Revenue Growth and Profits long cards */}
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
                isYellow={true} // Special background color for this card
              />
            </div>
          </motion.div>

          {/* Second row with Sales Overview and Distribution chart */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-[2.04fr_1fr] gap-4 mb-4"
            initial={{ opacity: 0, y: 20 }} // Animation for appearance
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <SalesOverview /> {/* Sales line chart */}
            <DistributionChart /> {/* Distribution chart */}
          </motion.div>

          {/* Third row with bar chart */}
          <motion.div
            className="grid grid-cols-1 gap-4 lg:col-span-3"
            initial={{ opacity: 0, y: 20 }} // Delayed animation for appearance
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <DashBarChart /> {/* Bar chart component */}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};
