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
  // Check if dark mode is active from global state
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // Styling based on dark mode
  const tooltipContentStyle = isDarkMode
    ? { backgroundColor: "rgba(17, 24, 39, 0.9)", borderColor: "#6B7280" }
    : { backgroundColor: "#ffffff", borderColor: "#000000" };

  const tooltipItemStyle = isDarkMode
    ? { color: "#ffffff" }
    : { color: "#000000" };
  
  // Axis and grid line colors based on dark mode
  const axisLineColor = isDarkMode ? "#ffffff" : "#000000";
  const gridStrokeColor = isDarkMode ? "#374151" : "#e5e7eb";
  
  // Bar color
  const barColor = "#8B5CF6";

  return (
    <div className="p-5 w-full bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-300 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Monthly Revenue Distribution
      </h2>
      <div className="h-[270px]">
        {/* Responsive container for chart */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20 }}>
            {/* Grid lines */}
            <CartesianGrid strokeDasharray="3 3" stroke={gridStrokeColor} />
            {/* X and Y axes */}
            <XAxis dataKey="name" stroke={axisLineColor} />
            <YAxis stroke={axisLineColor} />
            {/* Tooltip for hover information */}
            <Tooltip
              contentStyle={tooltipContentStyle}
              itemStyle={tooltipItemStyle}
              cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
            />
            {/* Bar for revenue data */}
            <Bar dataKey="revenue" fill={barColor} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashBarChart;
