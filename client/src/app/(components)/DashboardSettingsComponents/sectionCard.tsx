import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

// Props for SectionCard
interface SectionCardProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({
  icon: Icon,
  title,
  children,
}) => {
  return (
    <motion.div
      className="pb-2 w-full bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-300 relative overflow-hidden"
      whileHover={{ boxShadow: "0 10px 30px -12px black" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative background circles */}
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-30 bg-[#8B5CF6]"
        style={{ transform: "translate(20%, -70%)" }}
      ></div>
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-30 bg-[#8B5CF6]"
        style={{ transform: "translate(70%, -40%)" }}
      ></div>

      {/* Main card content */}
      <div className="flex items-center px-4 py-3 sm:p-4 relative z-10">
        <span
          className="inline-flex items-center justify-center rounded-lg bg-indigo-200 bg-opacity-25"
          style={{ width: "35px", height: "35px" }}
        >
          <Icon size={20} className="text-black" />
        </span>

        <div className="ml-4">
          <h2 className="text-xl font-semibold text-black">{title}</h2>
        </div>
      </div>

      <div className="px-4 pb-4 sm:p-4 text-sm text-gray-700">{children}</div>
    </motion.div>
  );
};

export default SectionCard;
