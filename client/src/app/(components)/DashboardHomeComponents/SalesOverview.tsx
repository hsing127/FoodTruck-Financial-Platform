import { useAppSelector } from "@/app/redux";
import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Dropdown from "@/app/(components)/Common/Dropdown";
import {
  weeklySalesData,
  monthlySalesData,
  yearlySalesData,
} from "./salesData";

const SalesOverview: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [view, setView] = useState<"week" | "month" | "year">("month");
  const chartRef = useRef<HTMLDivElement>(null);

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

  // Handle window resize events (if needed)
  useEffect(() => {
    const handleResize = () => {
      // Implement any responsive logic if needed
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

  // Determine data based on selected view
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
    return view === "week" ? "day" : view === "year" ? "year" : "month";
  };

  return (
    <motion.div
      className="p-5 w-full bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-300 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      ref={chartRef}
    >
      {/* Dropdown in the top-right corner */}
      <div className="absolute top-4 right-6">
        <Dropdown
          options={["week", "month", "year"]}
          selected={view}
          onSelect={(option) => setView(option as "week" | "month" | "year")}
        />
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
                stroke={isDarkMode ? "#ffffff" : "#000000"}
              />
              <YAxis stroke={isDarkMode ? "#ffffff" : "#000000"} />
              <Tooltip
                contentStyle={tooltipStyles.contentStyle}
                itemStyle={tooltipStyles.itemStyle}
                cursor={false}
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
