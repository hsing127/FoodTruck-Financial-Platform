import React from "react";
import { ReportData } from "@/app/types/types";

interface PerformanceTableProps {
  data: ReportData[];
}

const PerformanceTable: React.FC<PerformanceTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Year
            </th>
            <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              NAICS Code
            </th>
            <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Province
            </th>
            <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Total Assets
            </th>
            <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Quality Indicator
            </th>
            <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Bottom Quartile
            </th>
            <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Lower Middle
            </th>
            <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Upper Middle
            </th>
            <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Top Quartile
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((report, index) => (
            <tr key={index} className="border-b">
              <td className="py-4 px-6 text-sm text-gray-700">{report.year}</td>
              <td className="py-4 px-6 text-sm text-gray-700">
                {report.naicsCode}
              </td>
              <td className="py-4 px-6 text-sm text-gray-700">
                {report.province}
              </td>
              <td className="py-4 px-6 text-sm text-gray-700">
                ${report.totalAssets.toFixed(2)}
              </td>
              <td className="py-4 px-6 text-sm text-gray-700">
                {report.qualityIndicator}
              </td>
              <td className="py-4 px-6 text-sm text-gray-700">
                {report.bottomQuartile}
              </td>
              <td className="py-4 px-6 text-sm text-gray-700">
                {report.lowerMiddle}
              </td>
              <td className="py-4 px-6 text-sm text-gray-700">
                {report.upperMiddle}
              </td>
              <td className="py-4 px-6 text-sm text-gray-700">
                {report.topQuartile}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PerformanceTable;
