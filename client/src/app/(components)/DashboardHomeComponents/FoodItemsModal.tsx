import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { X, ChevronUp, ChevronDown } from "lucide-react";

interface FoodItem {
  name: string;
  price: string;
  profit: string;
  isProfit: boolean;
}

interface FoodItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: FoodItem[];
}

const FoodItemsModal: React.FC<FoodItemsModalProps> = ({
  isOpen,
  onClose,
  items,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal if clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <motion.div
      className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-6xl overflow-y-auto max-h-[90%]"
        style={{
          maxHeight: `${Math.min(items.length * 75, 80)}vh`, // Dynamic height based on items
          overflowY: "auto",
        }}
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Modal title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          All Food Items
        </h2>

        {/* Food items list */}
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 px-4 bg-white bg-opacity-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-700">{item.name}</p>
                <p
                  className={`text-xs ${
                    item.isProfit ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.profit}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-right font-medium text-gray-900 mr-2">
                  {item.price}
                </p>
                {item.isProfit ? (
                  <ChevronUp className="w-4 h-4 text-green-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default FoodItemsModal;
