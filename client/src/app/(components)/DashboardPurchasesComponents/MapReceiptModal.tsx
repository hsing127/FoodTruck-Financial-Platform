import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { backdropVariants, modalVariants } from "../Common/Animations";

interface MapReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMapComplete: (data: { input1: string; input2: string }) => void;
}

const MapReceiptModal: React.FC<MapReceiptModalProps> = ({ isOpen, onClose, onMapComplete }) => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleSubmit = () => {
    if (!input1 || !input2) {
      alert("Please fill in both fields.");
      return;
    }
    onMapComplete({ input1, input2 });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-96"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">Map Receipt</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <input
              type="text"
              placeholder="Receipt Item Name"
              className="w-full border border-gray-300 rounded p-2 mb-4"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
            />
            <input
              type="text"
              placeholder="Mapped Inventory Item"
              className="w-full border border-gray-300 rounded p-2 mb-4"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
            />
            
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Enter
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MapReceiptModal;