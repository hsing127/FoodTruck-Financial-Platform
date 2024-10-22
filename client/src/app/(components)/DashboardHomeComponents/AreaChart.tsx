import { useAppSelector } from "@/app/redux";
import { motion } from "framer-motion";
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  MoreHorizontal,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

// Mock data for chart and items
const volumeData = [
  { month: "Jan", volume: 5618 },
  { month: "Feb", volume: 7430 },
  { month: "Mar", volume: 4649 },
  { month: "Apr", volume: 5840 },
  { month: "May", volume: 4796 },
  { month: "Jun", volume: 7174 },
  { month: "Jul", volume: 5738 },
  { month: "Aug", volume: 7290 },
  { month: "Sep", volume: 7974 },
  { month: "Oct", volume: 6280 },
  { month: "Nov", volume: 3237 },
  { month: "Dec", volume: 7947 },
];

const foodItems = [
  { name: "Pizza", price: "$15.00", profit: "10% Profit", isProfit: true },
  { name: "Burger", price: "$10.00", profit: "5% Loss", isProfit: false },
  { name: "Pasta", price: "$12.00", profit: "8% Profit", isProfit: true },
  { name: "Salad", price: "$8.00", profit: "6% Profit", isProfit: true },
  { name: "Sushi", price: "$20.00", profit: "12% Profit", isProfit: true },
];

const VolumeOverview = () => {
  const [chartHeight, setChartHeight] = useState("25vh");
  const [isChartVisible, setIsChartVisible] = useState(false);
  const chartRef = useRef(null);
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

  // handle window resize events
  const handleResize = useCallback(() => {
    setChartHeight(window.innerHeight < 900 ? "10vh" : "15vh");
  }, []);

  // observer to watch if chart is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsChartVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = chartRef.current;
    if (currentRef) observer.observe(currentRef);

    // Add a event listener to handle window resizing
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [handleResize]);

  return (
    <motion.div
      className="p-5 w-full bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-300 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      ref={chartRef}
    >
      {/* Options button at the top right */}
      <div className="absolute top-4 right-5">
        <div className="p-2 rounded-xl hover:bg-gray-200 transition duration-300 cursor-pointer">
          <MoreHorizontal className="w-6 h-6 text-gray-700" />
        </div>
      </div>

      {/* Title section */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Popular Foods</h2>
      </div>

      {/* Sales info section */}
      <div className="relative p-4 bg-rose-100 rounded-lg shadow-inner">
        <div className="absolute top-2 left-4">
          <h2 className="text-lg font-semibold text-customBlack">
            Pizza Sales
          </h2>
          <p className="text-sm text-customBlack">10% Profit</p>
        </div>

        <div className="absolute top-2 right-4">
          <h2 className="text-xl font-semibold text-customBlack">$1899.00</h2>
        </div>

        {/* Chart container */}
        <div className="w-full mt-8" style={{ height: chartHeight }}>
          {isChartVisible && (
            <ResponsiveContainer>
              <AreaChart data={volumeData}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="transparent" />
                <XAxis hide />
                <YAxis hide />
                <Tooltip
                  contentStyle={tooltipStyles.contentStyle}
                  itemStyle={tooltipStyles.itemStyle}
                  cursor={false}
                />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#8B5CF6"
                  fillOpacity={1}
                  fill="url(#colorVolume)"
                  strokeWidth={3}
                  dot={false}
                  activeDot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Food items list */}
      <div className="mt-6">
        {foodItems.slice(0, 3).map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-between items-center py-2 px-4 bg-white bg-opacity-50 rounded-lg mb-2"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.5)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <p className="font-medium text-gray-700">{item.name}</p>
              <p
                className={`text-xs ${
                  item.isProfit ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.profit}
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-right font-medium text-gray-900 mr-2">
                {item.price}
              </p>
              {item.isProfit ? (
                <ChevronUp className="w-4 h-4 text-green-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-red-500" />
              )}
            </div>
          </motion.div>
        ))}

        {/* View all button */}
        <div className="text-center mt-4">
          <button className="text-sm text-blue-500 font-medium inline-flex items-center hover:text-blue-700 transition-colors duration-300">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default VolumeOverview;
