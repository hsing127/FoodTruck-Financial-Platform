import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface AddReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const AddReceiptModal: React.FC<AddReceiptModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-white/30 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg w-[80%] overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="flex justify-between items-center text-black p-6">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="text-white hover:text-gray-200"
            onClick={onClose}
          >
            <X size={24}  className="text-black"/>
          </button>
        </div>
        {/* Modal Content */}
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default AddReceiptModal;
