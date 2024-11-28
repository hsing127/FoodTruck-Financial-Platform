import React, { useEffect, useState } from "react";
import IngredientTable from "./IngredientTable";
import { Ingredient, MenuItem } from "@/app/types/types";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { backdropVariants, modalVariants } from "../Common/Animations";

interface ViewMenuItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItem: MenuItem | null;
  onSave: (updatedMenuItem: MenuItem) => void;
}

const ViewMenuItemDetailsModal: React.FC<ViewMenuItemDetailsModalProps> = ({
  isOpen,
  onClose,
  menuItem,
  onSave,
}) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [editableMenuItem, setEditableMenuItem] = useState<MenuItem | null>(
    null
  );

  // Initialize ingredients and editableMenuItem when menuItem changes
  useEffect(() => {
    if (menuItem) {
      setIngredients(menuItem.ingredients);
      setEditableMenuItem({ ...menuItem });
    }
  }, [menuItem]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editableMenuItem) {
      const { name, value } = e.target;
      setEditableMenuItem({
        ...editableMenuItem,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    if (editableMenuItem) {
      // Update ingredients
      const updatedMenuItem: MenuItem = {
        ...editableMenuItem,
        ingredients,
      };
      onSave(updatedMenuItem);
      onClose();
    }
  };

  if (!menuItem) return null;

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
                Edit Menu Item
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={28} />
              </button>
            </div>

            {/* Editable Menu Item Details */}
            <div className="mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editableMenuItem?.name || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={editableMenuItem?.price || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="h-10 mt-7 text-sm font-medium rounded px-4 py-2 bg-[#8B5CF6] hover:bg-[#b07ff0] transition-colors duration-200"
                >
                  Save
                </button>
              </div>
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

export default ViewMenuItemDetailsModal;
