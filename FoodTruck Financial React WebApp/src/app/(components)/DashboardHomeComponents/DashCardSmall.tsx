import { motion } from "framer-motion";
import {
  LucideIcon,
  MoreHorizontal,
  CircleChevronUp,
  CircleChevronDown,
} from "lucide-react";
import React, { useState } from "react";

interface DashCardSmallProps {
  name: string;
  icon: LucideIcon;
  value?: string | number;
  color?: string;
  withEllipse?: boolean;
  withToggleButtons?: boolean;
  monthlyValue?: string | number;
  yearlyValue?: string | number;
  isTrendingUp?: boolean;
}

const DashCardSmall: React.FC<DashCardSmallProps> = ({
  name,
  icon: Icon,
  value,
  color,
  withEllipse = false,
  withToggleButtons = false,
  monthlyValue,
  yearlyValue,
  isTrendingUp,
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [activeButton, setActiveButton] = useState<"month" | "year">("month");

  const handleToggle = (type: "month" | "year") => {
    setActiveButton(type);
    if (type === "month") {
      setCurrentValue(monthlyValue);
    } else {
      setCurrentValue(yearlyValue);
    }
  };

  return (
    <motion.div
      className="w-full bg-white bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-300 relative"
      whileHover={{ y: -5, boxShadow: "0 10px 30px -12px black" }}
    >
      {withEllipse && (
        <div className="z-10 absolute top-3 right-5">
          <div className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition duration-300 cursor-pointer">
            <MoreHorizontal className="w-6 h-6 text-gray-700" />
          </div>
        </div>
      )}

      {withToggleButtons && (
        <div className="z-10 absolute top-4 right-4 flex ">
          <button
            onClick={() => handleToggle("month")}
            className={`w-16 px-2 py-1 text-sm font-medium rounded-md transition duration-300 ${
              activeButton === "month"
                ? "bg-[#8B5CF6] text-white"
                : "bg-transparent text-black hover:bg-gray-200"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => handleToggle("year")}
            className={`z-10 w-16 px-2 py-1 text-sm font-medium rounded-lg transition duration-300 ${
              activeButton === "year"
                ? "bg-[#8B5CF6] text-white"
                : "bg-transparent text-black hover:bg-gray-200"
            }`}
          >
            Year
          </button>
        </div>
      )}

      <div
        className={`absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 z-0 ${
          isTrendingUp ? "bg-purple-500" : "bg-blue-400"
        }`}
        style={{ transform: "translate(20%, -50%)" }}
      ></div>
      <div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 z-0 ${
          isTrendingUp ? "bg-purple-500" : "bg-blue-400"
        }`}
        style={{ transform: "translate(50%, -20%)" }}
      ></div>

      <div className="relative px-4 py-6 sm:p-8">
        <span className="flex items-center text-sm font-medium text-black">
          <span
            className={`inline-flex items-center justify-center rounded-lg ${color} bg-opacity-25`}
            style={{ width: "35px", height: "35px" }}
          >
            <Icon size={20} className="text-black" />
          </span>
        </span>
        <div className="flex items-center">
          <p className="mt-2 text-3xl font-semibold text-black">
            {currentValue}
          </p>
          {isTrendingUp !== undefined && (
            <span className="ml-2 mt-3">
              {isTrendingUp ? (
                <CircleChevronUp size={20} className="text-purple-500" />
              ) : (
                <CircleChevronDown size={20} className="text-blue-400" />
              )}
            </span>
          )}
        </div>
        <p className="pt-2">{name}</p>
      </div>
    </motion.div>
  );
};

export default DashCardSmall;
