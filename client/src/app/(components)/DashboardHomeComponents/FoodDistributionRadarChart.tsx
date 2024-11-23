import React from "react";
import { useAppSelector } from "@/app/redux";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";
import { fadeInUpVariants } from "../Common/Animations";

// Mock data for food distribution chart
const foodDistributionData = [
  { food: "Pizza", quantity: 120 },
  { food: "Burger", quantity: 95 },
  { food: "Pasta", quantity: 80 },
  { food: "Sushi", quantity: 70 },
  { food: "Salad", quantity: 50 },
  { food: "Steak", quantity: 110 },
];

const FoodDistributionRadarChart: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // Tooltip styling based on dark mode
  const tooltipStyles = {
    contentStyle: {
      backgroundColor: isDarkMode ? "rgba(17, 24, 39, 0.9)" : "#ffffff",
      borderColor: isDarkMode ? "#6B7280" : "#000000",
    },
    itemStyle: {
      color: isDarkMode ? "#ffffff" : "#000000",
    },
  };

  return (
    <motion.div
      className="p-4 w-full bg-white bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-300"
      variants={fadeInUpVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-black">Food Distribution</h2>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <RadarChart data={foodDistributionData}>
            <PolarGrid stroke={isDarkMode ? "#4B5563" : "#E5E7EB"} />
            <PolarAngleAxis
              dataKey="food"
              stroke={isDarkMode ? "#ffffff" : "#000000"}
            />
            <PolarRadiusAxis
              angle={30}
              stroke={isDarkMode ? "#9CA3AF" : "#374151"}
            />
            <Tooltip
              contentStyle={tooltipStyles.contentStyle}
              itemStyle={tooltipStyles.itemStyle}
            />
            <Radar
              name="Quantity"
              dataKey="quantity"
              stroke="#8B5CF6"
              fill="#8B5CF6"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default FoodDistributionRadarChart;
