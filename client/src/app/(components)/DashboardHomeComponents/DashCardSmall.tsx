import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LucideIcon,
  MoreHorizontal,
  CircleChevronUp,
  CircleChevronDown,
} from "lucide-react";

// props for dashcard
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
    setCurrentValue(type === "month" ? monthlyValue : yearlyValue);
  };

  const backgroundColor = isTrendingUp ? "bg-purple-500" : "bg-blue-400";

  return (
    <motion.div
      className="w-full bg-white bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-300 relative"
      whileHover={{ y: -5, boxShadow: "0 10px 30px -12px black" }}
    >
      {/* Conditional ellipse in the top-right corner */}
      {withEllipse && (
        <div className="absolute top-3 right-5 z-10">
          <div className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition duration-300 cursor-pointer">
            <MoreHorizontal className="w-6 h-6 text-gray-700" />
          </div>
        </div>
      )}

      {/* Conditional toggle buttons for month/year selection */}
      {withToggleButtons && (
        <div className="absolute top-4 right-4 flex z-10">
          {["month", "year"].map((type) => (
            <button
              key={type}
              onClick={() => handleToggle(type as "month" | "year")}
              className={`w-16 px-2 py-1 text-sm font-medium rounded-md transition duration-300 ${
                activeButton === type
                  ? "bg-[#8B5CF6] text-white"
                  : "bg-transparent text-black hover:bg-gray-200"
              }`}
            >
              {type === "month" ? "Month" : "Year"}
            </button>
          ))}
        </div>
      )}

      {/* Decorative circles in the background */}
      {["translate(20%, -50%)", "translate(50%, -20%)"].map(
        (transform, index) => (
          <div
            key={index}
            className={`absolute top-0 right-0 rounded-full opacity-20 ${backgroundColor}`}
            style={{
              width: index === 0 ? "160px" : "130px",
              height: index === 0 ? "160px" : "130px",
              transform,
            }}
          ></div>
        )
      )}

      {/* Main card content */}
      <div className="relative px-4 py-6 sm:p-8">
        <div className="flex items-center text-sm font-medium text-black">
          <span
            className={`inline-flex items-center justify-center rounded-lg ${color} bg-opacity-25`}
            style={{ width: "35px", height: "35px" }}
          >
            <Icon size={20} className="text-black" />
          </span>
        </div>
        <div className="flex items-center mt-2">
          <p className="text-3xl font-semibold text-black">{currentValue}</p>
          {isTrendingUp !== undefined && (
            <span className="ml-2 mt-3">
              {isTrendingUp ? (
                <CircleChevronUp size={20} className="text-[#8B5CF6]" />
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
