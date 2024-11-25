import React, { useState } from "react";
import { motion } from "framer-motion";
import EditableCell from "../Common/EditableCell";
import ActionButtons from "../Common/ActionButtons";
import { InventoryItem } from "@/app/types/types";
import { useEditable } from "@/app/hooks/useEditable";
import { tableRowTransition } from "../Common/Animations";
import { useEditInventoryData } from "./InventoryApi";
import ConfirmModal from "../Common/ConfirmModal";

interface InventoryTableRowProps {
  item: InventoryItem;
  index: number;
  onItemEdit: (id: number, updatedItem: InventoryItem) => void;
  onItemDelete: (id: number) => void;
  setIsAnimating: (isAnimating: boolean) => void;
}

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const InventoryTableRow: React.FC<InventoryTableRowProps> = ({
  item,
  index,
  onItemEdit,
  onItemDelete,
  setIsAnimating,
}) => {
  const {
    isEditing,
    editedItem,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleInputChange,
  } = useEditable<InventoryItem>(item);

  const { editInventory, loading } = useEditInventoryData();

  // State for confirmation modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<number | null>(null);

  // Handler for delete button click
  const handleDelete = (e: React.MouseEvent) => {
    const isShiftPressed = e.shiftKey;
    if (isShiftPressed) {
      // Bypass confirmation
      onItemDelete(item.id);
    } else {
      // Open confirmation modal
      setItemToDeleteId(item.id);
      setIsConfirmModalOpen(true);
    }
  };

  // Confirm deletion
  const handleConfirmDelete = () => {
    if (itemToDeleteId !== null) {
      onItemDelete(itemToDeleteId);
      setItemToDeleteId(null);
      setIsConfirmModalOpen(false);
    }
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setItemToDeleteId(null);
    setIsConfirmModalOpen(false);
  };

  // Handler for save action with asynchronous update
  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    handleSaveClick();
    await editInventory(item, editedItem, "ajwitt2@asu.edu");
    onItemEdit(item.id, editedItem);
  };

  return (
    <>
      <motion.tr
        variants={rowVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{
          delay: index * 0.03,
          ...tableRowTransition,
          onStart: () => setIsAnimating(true),
          onComplete: () => setIsAnimating(false),
        }}
        className="cursor-pointer border-b border-t border-white"
      >
        <EditableCell
          isEditing={false}
          value={item.Name}
          name="Name"
          onChange={() => {}}
        />
        <EditableCell
          isEditing={isEditing}
          value={isEditing ? editedItem.Amount : item.Amount}
          name="Amount"
          onChange={handleInputChange}
          type="number"
        />
        <EditableCell
          isEditing={isEditing}
          value={isEditing ? editedItem.AmountUnits : item.AmountUnits}
          name="AmountUnits"
          onChange={handleInputChange}
        />
        <ActionButtons
          isEditing={isEditing}
          onEdit={(e) => {
            e.stopPropagation();
            handleEditClick();
          }}
          onSave={handleSave}
          onCancel={(e) => {
            e.stopPropagation();
            handleCancelClick();
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
        message="Are you sure you want to delete this inventory item? This action cannot be undone."
        proTip="Pro Tip: Hold down Shift while clicking Delete to bypass this confirmation."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default InventoryTableRow;
