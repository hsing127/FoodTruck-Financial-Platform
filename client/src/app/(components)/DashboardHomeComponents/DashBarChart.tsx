import { useAppSelector } from "@/app/redux";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for bar chart
const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 2000 },
  { name: "Apr", revenue: 2780 },
  { name: "May", revenue: 1890 },
  { name: "Jun", revenue: 2390 },
  { name: "Jul", revenue: 3490 },
  { name: "Aug", revenue: 2000 },
  { name: "Sep", revenue: 4300 },
  { name: "Oct", revenue: 2100 },
  { name: "Nov", revenue: 4000 },
  { name: "Dec", revenue: 3200 },
];

const DashBarChart: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // Styles configuration based on dark mode
  const chartStyles = {
    tooltip: {
      contentStyle: {
        backgroundColor: isDarkMode ? "rgba(17, 24, 39, 0.9)" : "#ffffff",
        borderColor: isDarkMode ? "#6B7280" : "#000000",
      },
      itemStyle: {
        color: isDarkMode ? "#ffffff" : "#000000",
      },
    },
    axisLineColor: isDarkMode ? "#ffffff" : "#000000",
    gridStrokeColor: isDarkMode ? "#374151" : "#e5e7eb",
  };

  return (
    <div className="p-5 w-full bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-300 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Monthly Revenue Distribution
      </h2>

      {/* Container for the bar chart */}
      <div className="h-[270px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartStyles.gridStrokeColor}
            />
            <XAxis dataKey="name" stroke={chartStyles.axisLineColor} />
            <YAxis stroke={chartStyles.axisLineColor} />
            <Tooltip
              contentStyle={chartStyles.tooltip.contentStyle}
              itemStyle={chartStyles.tooltip.itemStyle}
              cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
            />
            <Bar dataKey="revenue" fill="#8B5CF6" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashBarChart;
