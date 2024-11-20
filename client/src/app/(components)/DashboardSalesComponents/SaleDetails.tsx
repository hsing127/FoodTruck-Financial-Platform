import React, { useState } from "react";
import SaleDetailsRow from "./SaleDetailsRow";
import { SaleItem } from "@/app/types/types";

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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedItem((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  return (
    <div className="pl-[0%]">
      <table className="min-w-full mt-4 overflow-hidden">
        <thead>
          <tr>
            {["Menu Item", "", "Quantity", "Item Revenue", "Actions"].map(
              (header) => (
                <th
                        key={header}
                        className={header === "Menu Item"? "pl-7 w-1/4 text-left text-xs font-medium text-black uppercase tracking-wider": " w-1/4 text-left text-xs font-medium text-black uppercase tracking-wider"}
                >
                  {header}
                </th>
              )
            )}
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
              onItemDelete={onItemDelete ? () => onItemDelete(idx) : () => {}}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaleDetails;
