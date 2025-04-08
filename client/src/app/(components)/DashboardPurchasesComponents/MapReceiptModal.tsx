import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { backdropVariants, modalVariants } from "../Common/Animations";

interface MapReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMapComplete: (data: { receiptItemName: string; ingredientMappedName: string }) => void;
}

const MapReceiptModal: React.FC<MapReceiptModalProps> = ({ isOpen, onClose, onMapComplete }) => {
  const [receiptItemName, setReceiptItemName] = useState("");
  const [ingredientMappedName, setIngredientMappedName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!receiptItemName || !ingredientMappedName) {
      alert("Please fill in both fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/textract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: "none",
          receiptItem: receiptItemName,
          ingredientName: ingredientMappedName,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      onMapComplete({ receiptItemName, ingredientMappedName });
      onClose();
    } catch (error) {
      console.error("Error calling API:", error);
      alert("Something went wrong while submitting. Please try again.");
    } finally {
      setLoading(false);
    }
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
            onClick={(e) => e.stopPropagation()}
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
              value={receiptItemName}
              onChange={(e) => setReceiptItemName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Mapped Inventory Item"
              className="w-full border border-gray-300 rounded p-2 mb-4"
              value={ingredientMappedName}
              onChange={(e) => setIngredientMappedName(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Enter"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MapReceiptModal;