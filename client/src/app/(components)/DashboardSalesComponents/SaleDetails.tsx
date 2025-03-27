import React, { useState } from "react";
import SaleDetailsRow from "./SaleDetailsRow";
import { SaleItem } from "@/app/types/types";
import { motion } from "framer-motion"; // Optional: For animations

// Define the type for SaleDetails component props
interface SaleDetailsProps {
  details: SaleItem[];
  onItemEdit?: (index: number, updatedItem: SaleItem) => void;
  onItemDelete?: (index: number) => void;
}

const SaleDetails: React.FC<SaleDetailsProps> = ({
  details,
  onItemEdit,
  onItemDelete,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<SaleItem | null>(null);

  // Toggle edit mode and initialize edited item
  const handleEditClick = (index: number, item: SaleItem) => {
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
  const handleInputChange = (index: number, field: string, value: any) => {
  console.log(`Updating field: ${field}, New value: ${value}, at index ${index}`);

  setEditedItem((prev) => 
    prev ? { ...prev, [field]: field === "count" || field === "itemrevenue" ? Number(value) : value } : null
  );
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
          No sales items found for this receipt.
        </motion.p>
      ) : (
        <div className="pl-[2%]">
          <table className="min-w-full mt-4 overflow-hidden">
            <thead>
              <tr>
                {[
                  "Menu Item",
                  "Quantity",
                  "Item Revenue",
                  "Profit Margin",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className={
                      header === "Menu Item"
                        ? "w-1/3 text-left text-xs font-medium text-black uppercase tracking-wider"
                        : "w-1/5 text-left text-xs font-medium text-black uppercase tracking-wider"
                    }
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {details.map((detail, idx) => (
                <SaleDetailsRow
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

export default SaleDetails;
