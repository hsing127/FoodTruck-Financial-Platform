import "@/app/globals.css";
import React, { useState, useEffect, useRef } from "react";
import { useAppSelector } from "@/app/redux";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  weeklySalesData,
  monthlySalesData,
  yearlySalesData,
} from "./salesData";

const SalesOverview: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [view, setView] = useState<"week" | "month" | "year">("month");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Handle view change and close dropdown
  const handleViewChange = (newView: "week" | "month" | "year") => {
    setView(newView);
    setIsDropdownOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  //chart visibility when in viewport
  // Chart visibility when in viewport
  useEffect(() => {
    const currentRef = chartRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsChartVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  //styles based on dark mode
  // Styles based on dark mode
  const styles = {
    tooltip: {
      content: {
        backgroundColor: isDarkMode ? "rgba(17, 24, 39, 0.9)" : "#ffffff",
        borderColor: isDarkMode ? "#6B7280" : "#000000",
      },
      item: {
        color: isDarkMode ? "#ffffff" : "#000000",
      },
    },
    axisLineColor: isDarkMode ? "#ffffff" : "#000000",
  };

  // Animation variants for staggered dropdown options
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
    exit: { opacity: 0, y: -10 },
  };

  // Determine the data and labels based on the selected view
  const getData = () => {
    switch (view) {
      case "week":
        return weeklySalesData;
      case "month":
        return monthlySalesData;
      case "year":
        return yearlySalesData;
      default:
        return monthlySalesData;
    }
  };

  const getXAxisDataKey = () => {
    return view === "week" ? "day" : view === "month" ? "month" : "year";
  };

  return (
    <motion.div
      className="p-5 w-full bg-white bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-300 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      ref={chartRef}
    >
      {/* Menu icon and dropdown */}
      <div className="absolute top-4 right-6">
        <div className="relative">
          <button
            className="p-2 rounded-xl hover:bg-gray-200 transition duration-300 cursor-pointer"
            onClick={toggleDropdown}
          >
            <Menu className="w-6 h-6 text-gray-700 cursor-pointer" />
          </button>

          {/* Dropdown menu with staggered animation */}
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
                    onClick={() =>
                      handleViewChange(option as "week" | "month" | "year")
                    }
                    className={`w-full px-4 py-2 text-sm text-left hover:bg-[#8B5CF6] ${
                      view === option
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

      <h2 className="text-lg font-medium mb-4 text-black">Sales Overview</h2>

      {/* Container for the line chart */}
      <div className="w-full h-[39vh] min-h-[350px]">
        {isChartVisible && (
          <ResponsiveContainer>
            <LineChart data={getData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey={getXAxisDataKey()}
                stroke={styles.axisLineColor}
              />
              <YAxis stroke={styles.axisLineColor} />
              <Tooltip
                contentStyle={styles.tooltip.content}
                itemStyle={styles.tooltip.item}
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
        )}
      </div>
    </motion.div>
  );
};

export default SalesOverview;
