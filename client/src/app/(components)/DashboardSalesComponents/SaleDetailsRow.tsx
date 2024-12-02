// SaleDetailsRow.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import EditableCell from "../Common/EditableCell";
import ActionButtons from "../Common/ActionButtons";
import { SaleItem } from "@/app/types/types";
import { menuItemRowVariants } from "../Common/Animations";
import ConfirmModal from "../Common/ConfirmModal"; // Ensure the path is correct

interface SaleDetailsRowProps {
  item: SaleItem;
  index: number;
  isEditing: boolean;
  editedItem: SaleItem | null;
  onEditClick: (index: number, item: SaleItem) => void;
  onSaveClick: (index: number) => void;
  onCancelClick: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onItemDelete: (index: number) => void;
}

const SaleDetailsRow: React.FC<SaleDetailsRowProps> = ({
  item,
  index,
  isEditing,
  editedItem,
  onEditClick,
  onSaveClick,
  onCancelClick,
  handleInputChange,
  onItemDelete,
}) => {
  const currentItem = isEditing && editedItem ? editedItem : item;

  // State for confirmation modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDeleteIndex, setItemToDeleteIndex] = useState<number | null>(
    null
  );

  // Handler for delete button click
  const handleDelete = (e: React.MouseEvent) => {
    const isShiftPressed = e.shiftKey;
    if (isShiftPressed) {
      // Bypass confirmation
      onItemDelete(index);
    } else {
      // Open confirmation modal
      setItemToDeleteIndex(index);
      setIsConfirmModalOpen(true);
    }
  };

  // Confirm deletion
  const handleConfirmDelete = () => {
    if (itemToDeleteIndex !== null) {
      onItemDelete(itemToDeleteIndex);
      setItemToDeleteIndex(null);
      setIsConfirmModalOpen(false);
    }
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setItemToDeleteIndex(null);
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <motion.tr
        variants={menuItemRowVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{
          delay: index * 0.1,
          duration: 0.3,
        }}
      >
        <EditableCell
          isEditing={isEditing}
          value={currentItem.menuitemname}
          name="menuItem"
          onChange={handleInputChange}
        />
        <EditableCell
          isEditing={isEditing}
          value={currentItem.count}
          name="quantity"
          onChange={handleInputChange}
          type="number"
        />
        <EditableCell
          isEditing={isEditing}
          value={currentItem.itemrevenue}
          name="revenue"
          onChange={handleInputChange}
          type="number"
        />

        <td className="py-2 px-4 text-sm text-black">
          {/* Hard-coded profit margin value */}
          <span className="text-gray-700">15%</span>
        </td>

        <ActionButtons
          isEditing={isEditing}
          onEdit={(e) => {
            e.stopPropagation(); // Prevents row toggle
            onEditClick(index, item);
          }}
          onSave={(e) => {
            e.stopPropagation(); // Prevents row toggle
            onSaveClick(index);
          }}
          onCancel={(e) => {
            e.stopPropagation(); // Prevents row toggle
            onCancelClick();
          }}
          onDelete={(e) => {
            handleDelete(e);
          }}
        />
      </motion.tr>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this sale item? This action cannot be undone."
        proTip="Pro Tip: Hold down Shift while clicking Delete to bypass this confirmation."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default SaleDetailsRow;
