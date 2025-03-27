import React, { useState } from "react";
import { motion } from "framer-motion";
import EditableCell from "../Common/EditableCell";
import ActionButtons from "../Common/ActionButtons";
import { SaleItem } from "@/app/types/types";
import { menuItemRowVariants } from "../Common/Animations";
import ConfirmModal from "../Common/ConfirmModal";

interface SaleDetailsRowProps {
  item: SaleItem;
  index: number;
  isEditing: boolean;
  editedItem: SaleItem | null;
  onEditClick: (index: number, item: SaleItem) => void;
  onSaveClick: (index: number) => void;
  onCancelClick: () => void;
  handleInputChange: (index: number, field: string, value: any) => void;
  onItemDelete: (menuName: string, itemIndex: number) => void;
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
  // Ensure correct item reference
  const currentItem = isEditing && editedItem ? editedItem : item;

  // Local state for managing text input without immediate re-render
  const [localItem, setLocalItem] = useState<SaleItem>({ ...item });

  // State for confirmation modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDeleteIndex, setItemToDeleteIndex] = useState<number | null>(null);
  const [itemToDeleteName, setItemToDeleteName] = useState<string | null>(null);

  // Handle local input change
  const handleLocalChange = (field: string, value: any) => {
    setLocalItem((prev) => ({
      ...prev,
      [field]: field === "count" || field === "itemrevenue" ? value.replace(/[^0-9.]/g, "") : value,
    }));
  };

  // Handler for delete button click
  const handleDelete = (e: React.MouseEvent) => {
    const isShiftPressed = e.shiftKey;
    if (isShiftPressed) {
      onItemDelete(currentItem.menuitemname, index);
    } else {
      setItemToDeleteIndex(index);
      setItemToDeleteName(currentItem.menuitemname);
      setIsConfirmModalOpen(true);
    }
  };

  // Confirm deletion of menu item
  const handleConfirmDelete = () => {
    if (itemToDeleteIndex !== null && itemToDeleteName) {
      onItemDelete(itemToDeleteName, itemToDeleteIndex);
      setItemToDeleteIndex(null);
      setItemToDeleteName(null);
      setIsConfirmModalOpen(false);
    }
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setItemToDeleteIndex(null);
    setItemToDeleteName(null);
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <motion.tr
        variants={menuItemRowVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ delay: index * 0.1, duration: 0.3 }}
      >
        <td className="py-3 px-4">
          {isEditing ? (
            <input
              type="text"
              name="menuitemname"
              value={localItem.menuitemname}
              onChange={(e) => handleLocalChange("menuitemname", e.target.value)}
              className="border p-1 rounded w-full"
            />
          ) : (
            currentItem.menuitemname
          )}
        </td>

        <td className="py-3 px-4">
          {isEditing ? (
            <input
              type="text"
              name="count"
              value={localItem.count.toString()}
              onChange={(e) => handleLocalChange("count", e.target.value)}
              className="border p-1 rounded w-full"
            />
          ) : (
            currentItem.count
          )}
        </td>

        <td className="py-3 px-4">
          {isEditing ? (
            <input
              type="text"
              name="itemrevenue"
              value={localItem.itemrevenue.toString()}
              onChange={(e) => handleLocalChange("itemrevenue", e.target.value)}
              className="border p-1 rounded w-full"
            />
          ) : (
            currentItem.itemrevenue
          )}
        </td>

        <td className="py-3 px-4 text-sm text-black">
          <span className="text-gray-700">15%</span>
        </td>

        <ActionButtons
          isEditing={isEditing}
          onEdit={(e) => {
            e.stopPropagation();
            setLocalItem({ ...item }); // Reset local state when editing starts
            onEditClick(index, item);
          }}
          onSave={(e) => {
            e.stopPropagation();
            handleInputChange(index, "menuitemname", localItem.menuitemname);
            handleInputChange(index, "count", localItem.count);
            handleInputChange(index, "itemrevenue", localItem.itemrevenue);
            onSaveClick(index);
          }}
          onCancel={(e) => {
            e.stopPropagation();
            setLocalItem({ ...item }); // Restore original values
            onCancelClick();
          }}
          onDelete={(e) => {
            e.stopPropagation();
            handleDelete(e);
          }}
        />
      </motion.tr>

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
