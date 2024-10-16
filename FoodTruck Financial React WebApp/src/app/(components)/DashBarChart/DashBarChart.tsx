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
  return (
    <div className="p-5 w-full bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-300">
      <h2 className="text-lg font-semibold text-gray-900">
        Monthly Revenue Distribution
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderColor: "#ddd",
            }}
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
          />
          <Bar dataKey="revenue" fill="#8B5CF6" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashBarChart;
