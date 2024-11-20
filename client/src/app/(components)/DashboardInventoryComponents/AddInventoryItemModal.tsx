import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RefreshCcw } from "lucide-react";
import EditableCell from "../Common/EditableCell";
import { InventoryItem } from "@/app/types/types";
import { useAddInventoryData } from "./InventoryApi"; // import your custom hook

interface AddInventoryItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: InventoryItem) => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  exit: { scale: 0.95, opacity: 0, transition: { duration: 0.3 } },
};

const AddInventoryItemModal: React.FC<AddInventoryItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const initialItem: InventoryItem = {
    Name: "",
    Amount: "",
    AmountUnits: "",
    id: 0,
  };

  const [newItem, setNewItem] = useState<InventoryItem>(initialItem);
  const [submittedItem, setSubmittedItem] = useState<InventoryItem | null>(null); // New state to track the submitted item

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (newItem.Name.trim() === "") {
      alert("Name is required.");
      return;
    }
    setSubmittedItem(newItem); // Set the submitted item when "Add New Item" is clicked
    setNewItem(initialItem); // Reset the form fields
  };

  const handleReset = () => {
    setNewItem(initialItem);
  };

  // Call the custom hook to add inventory data when the submittedItem changes
  const { loading: addItemLoading, error: addItemError } = useAddInventoryData(
    submittedItem, // Pass the submitted item to the hook
    "ajwitt2@asu.edu" // Replace with actual email if needed
  );

  useEffect(() => {
    if (submittedItem) {
      // Handle loading and error states if needed
      if (addItemLoading) {
        console.log("Adding item...");
      }
      if (addItemError) {
        console.error("Error adding item:", addItemError);
      }
    }
  }, [submittedItem, addItemLoading, addItemError]); // Runs only when submittedItem changes

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
            className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-md overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            layout
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-black">
                Add Inventory Item
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={28} />
              </button>
            </div>

            {/* Inventory Item Details */}
            <table className="w-full mt-4 mb-6">
              <thead>
                <tr>
                  <th className="w-1/3 text-left text-sm font-medium text-black">
                    Name
                  </th>
                  <th className="w-1/3 text-left text-sm font-medium text-black">
                    Amount
                  </th>
                  <th className="w-1/3 text-left text-sm font-medium text-black">
                    Units
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <EditableCell
                    isEditing={true}
                    value={newItem.Name}
                    name="Name"
                    onChange={handleInputChange}
                    placeholder="Name"
                  />
                  <EditableCell
                    isEditing={true}
                    value={newItem.Amount}
                    name="Amount"
                    onChange={handleInputChange}
                    type="number"
                    placeholder="Amount"
                  />
                  <EditableCell
                    isEditing={true}
                    value={newItem.AmountUnits}
                    name="AmountUnits"
                    onChange={handleInputChange}
                    placeholder="Units"
                  />
                  <td className="pl-2 pt-2 text-sm text-black">
                    <button
                      onClick={handleReset}
                      className="text-blue-600 hover:text-blue-800"
                      title="Reset Fields"
                    >
                      <RefreshCcw size={20} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white font-medium rounded bg-[#8B5CF6] hover:bg-[#b07ff0]"
              >
                {addItemLoading ? "Adding..." : "Add New Item"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddInventoryItemModal;
