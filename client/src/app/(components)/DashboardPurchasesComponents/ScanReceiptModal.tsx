import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { backdropVariants, modalVariants } from "../Common/Animations";

interface ScanReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScanReceiptModal: React.FC<ScanReceiptModalProps> = ({ isOpen, onClose }) => {
  const [fileName, setFileName] = useState("");

  const handleSubmit = async () => {
    if (!fileName) {
      alert("Please enter a file name.");
      return;
    }

    try {
      const response = await fetch("https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/textract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: fileName }),
      });
      
      const data = await response.json();
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error submitting file:", error);
    }

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
              <h2 className="text-xl font-semibold text-black">Scan Receipt</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter file name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScanReceiptModal;