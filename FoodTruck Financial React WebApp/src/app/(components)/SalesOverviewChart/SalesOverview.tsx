import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import React from "react";
import { Menu } from "lucide-react";
import "@/app/globals.css";
import { useAppSelector } from "@/app/redux";

const monthlySalesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4500 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 5500 },
  { month: "Jul", sales: 7000 },
  { month: "Aug", sales: 4000 },
  { month: "Sep", sales: 3000 },
  { month: "Oct", sales: 5000 },
  { month: "Nov", sales: 4500 },
  { month: "Dec", sales: 6000 },
];

const SalesOverview = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const tooltipContentStyle = isDarkMode
    ? { backgroundColor: "rgba(17, 24, 39, 0.9)", borderColor: "#6B7280" }
    : { backgroundColor: "#ffffff", borderColor: "#000000" };

  const tooltipItemStyle = isDarkMode
    ? { color: "#ffffff" }
    : { color: "#000000" };
  const axisLineColor = isDarkMode ? "#ffffff" : "#000000";

  return (
    <motion.div
      className="p-5 w-full bg-white bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-300 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="absolute top-4 right-6">
        <div className="p-2 rounded-xl hover:bg-gray-50 transition duration-300 cursor-pointer">
          <Menu className="w-6 h-6 text-gray-700 cursor-pointer" />
        </div>
      </div>

      <h2 className="text-lg font-medium mb-4 text-black">Sales Overview</h2>

      <div className="w-full h-[40vh] min-h-[350px]">
        <ResponsiveContainer>
          <LineChart data={monthlySalesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke={axisLineColor} />
            <YAxis stroke={axisLineColor} />
            <Tooltip
              contentStyle={tooltipContentStyle}
              itemStyle={tooltipItemStyle}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={{ fill: "#8B5CF6", strokeWidth: 2 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesOverview;
