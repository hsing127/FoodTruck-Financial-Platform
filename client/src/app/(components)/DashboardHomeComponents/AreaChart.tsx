import { useAppSelector } from "@/app/redux";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useRef, useCallback } from "react";
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
import {
  MoreHorizontal,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  weeklyVolumeData,
  monthlyVolumeData,
  yearlyVolumeData,
  foodItems,
} from "./areaData";

const VolumeOverview = () => {
  const [chartHeight, setChartHeight] = useState("25vh");
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">(
    "month"
  );
  const chartRef = useRef(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      // Close dropdown only if clicked outside of dropdown and button
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        !target?.closest(".dropdown-toggle")
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mouseup", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mouseup", handleOutsideClick);
    };
  }, [isDropdownOpen]);

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

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
    exit: { opacity: 0, y: -10 },
  };

  return (
    <motion.div
      className="p-5 w-full bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-300 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      ref={chartRef}
    >
      {/* Options button */}
      <div className="absolute top-4 right-5">
        <div className="relative">
          <button
            className="p-2 rounded-xl hover:bg-gray-200 transition duration-300 cursor-pointer dropdown-toggle"
            onClick={toggleDropdown}
          >
            <MoreHorizontal className="w-6 h-6 text-gray-700" />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                ref={dropdownRef}
                className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-10"
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {["week", "month", "year"].map((option, index) => (
                  <motion.button
                    key={option}
                    onClick={() => {
                      setTimeframe(option as "week" | "month" | "year");
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-sm text-left hover:bg-[#8B5CF6] ${
                      timeframe === option
                        ? "bg-[#8B5CF6] text-white font-semibold"
                        : ""
                    }`}
                    custom={index}
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Title section */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Popular Foods</h2>
      </div>

      {/* Sales info section */}
      <div className="relative p-4 bg-[#e5d5f6] rounded-lg shadow-inner">
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
