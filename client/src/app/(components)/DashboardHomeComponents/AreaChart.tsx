import { useAppSelector } from "@/app/redux";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import FoodItemsModal from "./FoodItemsModal";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import {
  weeklyVolumeData,
  monthlyVolumeData,
  yearlyVolumeData,
  foodItems,
} from "./areaData";
import Dropdown from "@/app/(components)/Common/Dropdown";
import { fadeInUpVariants, hoverVariants } from "../Common/Animations";

const VolumeOverview: React.FC = () => {
  const [chartHeight, setChartHeight] = useState("25vh");
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">(
    "month"
  );
  const chartRef = useRef<HTMLDivElement>(null);
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

  // Handle window resize events
  useEffect(() => {
    const handleResize = () => {
      setChartHeight(window.innerHeight < 900 ? "10vh" : "15vh");
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Observer to watch if chart is visible
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

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Determine data based on selected timeframe
  const getChartData = () => {
    switch (timeframe) {
      case "week":
        return weeklyVolumeData;
      case "month":
        return monthlyVolumeData;
      case "year":
        return yearlyVolumeData;
      default:
        return monthlyVolumeData;
    }
  };

  return (
    <motion.div
      className="p-5 w-full bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-300 relative"
      variants={fadeInUpVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.2 }}
      ref={chartRef}
    >
      {/* Dropdown in the top-right corner */}
      <div className="absolute top-4 right-5">
        <Dropdown
          options={["week", "month", "year"]}
          selected={timeframe}
          onSelect={(option) =>
            setTimeframe(option as "week" | "month" | "year")
          }
        />
      </div>

      {/* Title section */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">Popular Foods</h2>
      </div>

      {/* Sales info section */}
      <motion.div
        className="relative p-4 bg-[#e5d5f6] rounded-lg shadow-inner"
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
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
        <div className="w-full mt-7" style={{ height: chartHeight }}>
          {isChartVisible && (
            <ResponsiveContainer>
              <AreaChart data={getChartData()}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="transparent" />
                <XAxis
                  hide={timeframe === "week"}
                  dataKey={timeframe === "year" ? "year" : "month"}
                />
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
      </motion.div>

      {/* Food items list */}
      <div className="mt-6">
        <AnimatePresence>
          {foodItems.slice(0, 3).map((item, index) => (
            <motion.div
              key={index}
              className="flex justify-between items-center py-2 px-4 bg-white bg-opacity-50 rounded-lg mb-2"
              variants={hoverVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
              exit="hidden"
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
        </AnimatePresence>

        {/* View all button */}
        <div className="text-center mt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-blue-500 font-medium inline-flex items-center hover:text-blue-700 transition-colors duration-300"
          >
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Food items modal */}
      <FoodItemsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={foodItems}
      />
    </motion.div>
  );
};

export default VolumeOverview;
