import React, { useState } from "react";
import ReceiptDetailsRow from "./ReceiptDetailsRow";
import { ReceiptItem } from "@/app/types/types";
import { motion } from "framer-motion"; // Optional: For animations

// Define the type for ReceiptDetails component props
interface ReceiptDetailsProps {
  details: ReceiptItem[];
  onItemEdit?: (index: number, updatedItem: ReceiptItem) => void;
  onItemDelete?: (index: number) => void;
}

const ReceiptDetails: React.FC<ReceiptDetailsProps> = ({
  details,
  onItemEdit,
  onItemDelete,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<ReceiptItem | null>(null);

  // Toggle edit mode and initialize edited item
  const handleEditClick = (index: number, item: ReceiptItem) => {
    setEditingIndex(index);
    setEditedItem({ ...item });
  };

  // Handle save button click
  const handleSaveClick = (index: number) => {
    if (onItemEdit && editedItem) onItemEdit(index, editedItem);
    resetEditing();
  };

  // Reset editing mode
  const resetEditing = () => {
    setEditingIndex(null);
    setEditedItem(null);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedItem((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  return (
    <div>
      {details.length === 0 ? (
        <motion.p
          className="text-center text-gray-600 p-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          No ingredients found for this receipt.
        </motion.p>
      ) : (
        <div className="pl-[19%]">
          <table className="min-w-full mt-4 overflow-hidden">
            <thead>
              <tr>
                {["Ingredient", "Quantity", "Units", "Price", "Actions"].map(
                  (header) => (
                    <th
                      key={header}
                      className="w-1/4 text-left text-xs font-medium text-black uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {details.map((detail, idx) => (
                <ReceiptDetailsRow
                  key={idx}
                  item={detail}
                  index={idx}
                  isEditing={editingIndex === idx}
                  editedItem={editedItem}
                  onEditClick={handleEditClick}
                  onSaveClick={handleSaveClick}
                  onCancelClick={resetEditing}
                  handleInputChange={handleInputChange}
                  onItemDelete={
                    onItemDelete ? () => onItemDelete(idx) : () => {}
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReceiptDetails;
