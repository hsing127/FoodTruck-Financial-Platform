import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface DashCardLongProps {
  // Props for card component
  name: string;
  icon: LucideIcon; // Icon passed as a prop
  value?: string | number; // Optional value to display
  color?: string; // Optional color for the icon background
  isYellow?: boolean; // Optional flag to conditionally change background
}

const DashCardLong: React.FC<DashCardLongProps> = ({
  name,
  icon: Icon, // Renaming icon prop to Icon for usage
  value,
  color,
  isYellow = false, // Default value for isYellow is false
}) => {
  return (
    <motion.div
      className="w-full bg-white bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-300 relative"
      whileHover={{ y: -5, boxShadow: "0 10px 30px -12px black" }} // Animation on hover
    >
      {/* Decorative circle backgrounds with conditional color */}
      <div
        className={`absolute top-0 right-0 w-20 h-20 rounded-full opacity-20 z-0 ${
          isYellow ? "bg-yellow-300" : "bg-blue-200"
        }`}
        style={{ transform: "translate(50%, -50%)" }}
      ></div>
      <div
        className={`absolute top-0 right-0 w-16 h-16 rounded-full opacity-20 z-0 ${
          isYellow ? "bg-yellow-300" : "bg-blue-200"
        }`}
        style={{ transform: "translate(70%, 20%)" }}
      ></div>

      {/* Main card content */}
      <div className="flex items-center px-4 py-3 sm:p-4 relative">
        <span
          className={`inline-flex items-center justify-center rounded-lg ${color} bg-opacity-25`}
          style={{ width: "35px", height: "35px" }}
        >
          <Icon size={20} className="text-black" /> {/* Icon display */}
        </span>

        <div className="ml-4">
          <p className="text-1xl font-semibold text-black">{value}</p> {/* Display value */}
          <p className="text-sm text-black">{name}</p> {/* Display name */}
        </div>
      </div>
    </motion.div>
  );
};

export default DashCardLong;
