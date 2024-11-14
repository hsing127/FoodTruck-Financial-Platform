import React, { useEffect, useState } from "react";
import IngredientTable from "./IngredientTable";
import { Ingredient } from "@/app/types/types";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface MenuItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIngredients: Ingredient[];
}

// Animation variants for backdrop and modal
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } },
};

const MenuItemDetailsModal: React.FC<MenuItemDetailsModalProps> = ({
  isOpen,
  onClose,
  initialIngredients,
}) => {
  const [ingredients, setIngredients] =
    useState<Ingredient[]>(initialIngredients);

      // Add this useEffect to update ingredients when initialIngredients changes
  useEffect(() => {
    setIngredients(initialIngredients);
  }, [initialIngredients]);

  const onItemEdit = (index: number, updatedItem: Ingredient) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((item, idx) => (idx === index ? updatedItem : item))
    );
  };

  const onItemDelete = (index: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, idx) => idx !== index)
    );
  };

  const onItemAdd = (newItem: Ingredient) => {
    setIngredients((prevIngredients) => [...prevIngredients, newItem]);
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
            className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-6xl overflow-y-auto max-h-[90%]"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
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
            {/* IngredientTable component */}
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
