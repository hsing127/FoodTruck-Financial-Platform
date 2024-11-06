import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import IngredientTable from "./IngredientTable";

interface Ingredient {
  ingredient: string;
  quantity: number;
  units: string;
  price: string;
}

interface MenuItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  ingredients: Ingredient[];
  onItemEdit?: (index: number, updatedItem: Ingredient) => void;
  onItemDelete?: (index: number) => void;
  onItemAdd?: (newItem: Ingredient) => void;
}

// Animation variants for the modal background
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// Animation variants for the modal itself
const modalVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } },
};

const MenuItemDetailsModal: React.FC<MenuItemDetailsModalProps> = ({
  isOpen,
  onClose,
  ingredients,
  onItemEdit,
  onItemDelete,
  onItemAdd,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          // Close the modal when clicking outside
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-6xl overflow-y-auto max-h-[90%]"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            // Prevent click inside modal from closing it
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-black">
                Ingredient Details
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={28} />
              </button>
            </div>

            {/* IngredientTable component to render the list of ingredients */}
            <IngredientTable
              ingredients={ingredients}
              onItemEdit={onItemEdit}
              onItemDelete={onItemDelete}
              onItemAdd={onItemAdd}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuItemDetailsModal;
