import React from "react";
import { motion } from "framer-motion";

interface MetricsCardProps {
  title: string;
  value: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value }) => {
  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border-gray-700 flex flex-col items-center text-center"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </motion.div>
  );
};

export default MetricsCard;
