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

// Mock data for food distribution chart
const foodDistributionData = [
  { food: "Pizza", quantity: 120 },
  { food: "Burger", quantity: 95 },
  { food: "Pasta", quantity: 80 },
  { food: "Sushi", quantity: 70 },
  { food: "Salad", quantity: 50 },
  { food: "Steak", quantity: 110 },
];

const FoodDistributionRadarChart = () => {
  // Check if dark mode is active from global state
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // Tooltip styling based on dark mode
  const tooltipContentStyle = isDarkMode
    ? { backgroundColor: "rgba(17, 24, 39, 0.9)", borderColor: "#6B7280" }
    : { backgroundColor: "#ffffff", borderColor: "#000000" };

  const tooltipItemStyle = isDarkMode
    ? { color: "#ffffff" }
    : { color: "#000000" };

  return (
    <motion.div
      className="p-4 w-full bg-white bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-300"
      initial={{ opacity: 0, y: 20 }} // Animation for initial appearance
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }} // Animation delay
    >
      <h2 className="text-lg font-medium mb-4 text-black">Food Distribution</h2> {/* Title of the chart */}
      <div className="w-full h-80">
        {/* Responsive container for the radar chart */}
        <ResponsiveContainer>
          <RadarChart data={foodDistributionData}>
            {/* Polar grid for radar chart */}
            <PolarGrid stroke={isDarkMode ? "#4B5563" : "#E5E7EB"} />
            {/* Polar angle axis for food names */}
            <PolarAngleAxis
              dataKey="food"
              stroke={isDarkMode ? "#ffffff" : "#000000"}
            />
            {/* Polar radius axis for quantity */}
            <PolarRadiusAxis
              angle={30}
              stroke={isDarkMode ? "#9CA3AF" : "#374151"}
            />
            {/* Tooltip for hover details */}
            <Tooltip
              contentStyle={tooltipContentStyle}
              itemStyle={tooltipItemStyle}
            />
            {/* Radar plot for quantity distribution */}
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
