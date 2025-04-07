import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ReportData } from "@/app/types/types";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MetricsChartProps {
  data: ReportData[];
}

const MetricsChart: React.FC<MetricsChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.year.toString()),
    datasets: [
      {
        label: "Total Assets",
        data: data.map((d) => d.totalAssets),
        borderColor: "#8B5CF6",
        backgroundColor: "#8B5CF6",
        fill: false,
      },
      {
        label: "Bottom Quartile",
        data: data.map((d) => d.bottomQuartile),
        borderColor: "#F59E0B",
        backgroundColor: "#F59E0B",
        fill: false,
      },
      {
        label: "Top Quartile",
        data: data.map((d) => d.topQuartile),
        borderColor: "#EF4444",
        backgroundColor: "#EF4444",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Financial Metrics Over Years",
      },
    },
  };

  return (
    <div className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border-gray-700">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MetricsChart;
