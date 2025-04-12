import { useState, useEffect } from "react";
import { ReportData } from "@/app/types/types";

export const useReportData = () => {
  const [data, setData] = useState<ReportData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData: ReportData[] = [
        {
          year: 2022,
          naicsCode: 722330,
          province: "Canada",
          totalAssets: 183.2,
          qualityIndicator: "C",
          bottomQuartile: 81.6,
          lowerMiddle: 76.5,
          upperMiddle: 155.3,
          topQuartile: 419.4,
        },
        {
          year: 2022,
          naicsCode: 722330,
          province: "Nova Scotia",
          totalAssets: 100.7,
          qualityIndicator: "C",
          bottomQuartile: 48.8,
          lowerMiddle: 99.6,
          upperMiddle: 76.5,
          topQuartile: 178.1,
        },
        {
          year: 2022,
          naicsCode: 722330,
          province: "New Brunswick",
          totalAssets: 99.1,
          qualityIndicator: "E",
          bottomQuartile: 36,
          lowerMiddle: 73.1,
          upperMiddle: 68,
          topQuartile: 219.5,
        },
        {
          year: 2022,
          naicsCode: 722330,
          province: "Quebec",
          totalAssets: 218.7,
          qualityIndicator: "C",
          bottomQuartile: 107.5,
          lowerMiddle: 144.8,
          upperMiddle: 237.5,
          topQuartile: 384.8,
        },
        {
          year: 2022,
          naicsCode: 722330,
          province: "Alberta",
          totalAssets: 140.4,
          qualityIndicator: "C",
          bottomQuartile: 97.2,
          lowerMiddle: 51.9,
          upperMiddle: 130.9,
          topQuartile: 281.9,
        },
        {
          year: 2022,
          naicsCode: 722330,
          province: "Prairies",
          totalAssets: 131.3,
          qualityIndicator: "C",
          bottomQuartile: 86.3,
          lowerMiddle: 52.9,
          upperMiddle: 129.7,
          topQuartile: 256.1,
        },
        {
          year: 2022,
          naicsCode: 722330,
          province: "British Columbia",
          totalAssets: 219,
          qualityIndicator: "C",
          bottomQuartile: 106.2,
          lowerMiddle: 85,
          upperMiddle: 159.4,
          topQuartile: 525.6,
        },
      ];
      setData(fetchedData);
    };

    fetchData();
  }, []);

  return data;
};
