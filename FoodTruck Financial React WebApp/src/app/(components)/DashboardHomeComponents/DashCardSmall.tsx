import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LucideIcon,
  MoreHorizontal,
  CircleChevronUp,
  CircleChevronDown,
} from "lucide-react";

interface DashCardSmallProps {
  // Props for card component
  name: string;
  icon: LucideIcon; // Icon passed as a prop
  value?: string | number; // Optional value to display
  color?: string; // Optional color for the icon background
  withEllipse?: boolean; // Option to display ellipse in the top-right corner
  withToggleButtons?: boolean; // Option to show toggle buttons for monthly/yearly view
  monthlyValue?: string | number; // Monthly value to display when toggled
  yearlyValue?: string | number; // Yearly value to display when toggled
  isTrendingUp?: boolean; // Indicator if the trend is going up or down
}

const DashCardSmall: React.FC<DashCardSmallProps> = ({
  name,
  icon: Icon, // Renaming icon prop to Icon for usage
  value,
  color,
  withEllipse = false, // Default value for ellipse visibility
  withToggleButtons = false, // Default value for toggle buttons visibility
  monthlyValue,
  yearlyValue,
  isTrendingUp,
}) => {
  const [currentValue, setCurrentValue] = useState(value); // State to track displayed value
  const [activeButton, setActiveButton] = useState<"month" | "year">("month"); // State to track active toggle button

  // Handle toggle button click
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
      whileHover={{ y: -5, boxShadow: "0 10px 30px -12px black" }} // Animation on hover
    >
      {/* Conditional ellipse in the top-right corner */}
      {withEllipse && (
        <div className="z-10 absolute top-3 right-5">
          <div className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition duration-300 cursor-pointer">
            <MoreHorizontal className="w-6 h-6 text-gray-700" />
          </div>
        </div>
      )}

      {/* Conditional toggle buttons for month/year selection */}
      {withToggleButtons && (
        <div className="z-10 absolute top-4 right-4 flex">
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

      {/* Decorative circles in the background with conditional color based on trend */}
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

      {/* Main card content */}
      <div className="relative px-4 py-6 sm:p-8">
        <span className="flex items-center text-sm font-medium text-black">
          <span
            className={`inline-flex items-center justify-center rounded-lg ${color} bg-opacity-25`}
            style={{ width: "35px", height: "35px" }}
          >
            <Icon size={20} className="text-black" /> {/* Icon display */}
          </span>
        </span>
        <div className="flex items-center">
          {/* Display the current value */}
          <p className="mt-2 text-3xl font-semibold text-black">
            {currentValue}
          </p>
          {/* Display trending icon based on trend direction */}
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
        <p className="pt-2">{name}</p> {/* Display the card name */}
      </div>
    </motion.div>
  );
};

export default DashCardSmall;
