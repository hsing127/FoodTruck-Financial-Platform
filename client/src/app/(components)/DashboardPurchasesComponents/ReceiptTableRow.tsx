import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Receipt } from "@/app/types/types";
import { useEditable } from "@/app/hooks/useEditable";
import ActionButtons from "../Common/ActionButtons";
import EditableCell from "../Common/EditableCell";
import ReceiptDetails from "./ReceiptDetails";
import ConfirmModal from "../Common/ConfirmModal";
import {
  chevronVariants,
  rowVariants,
  tableRowTransition,
} from "../Common/Animations";

// Define types for props
interface ReceiptTableRowProps {
  receipt: Receipt;
  isRowExpanded: (id: number) => boolean;
  toggleRow: (id: number) => void;
  handleDeleteClick: (receiptId: number) => void;
  index: number;
  setIsAnimating: (isAnimating: boolean) => void;
  onItemDelete: (receiptId: number, itemIndex: number) => void;
}

const ReceiptTableRow: React.FC<ReceiptTableRowProps> = ({
  receipt,
  isRowExpanded,
  toggleRow,
  handleDeleteClick,
  index,
  setIsAnimating,
  onItemDelete,
}) => {
  const {
    isEditing,
    editedItem,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleInputChange,
  } = useEditable<Receipt>(receipt);

  // State for confirmation modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [receiptToDelete, setReceiptToDelete] = useState<number | null>(null);

  // Handler for delete button click
  const onDelete = (e: React.MouseEvent) => {
    const isShiftPressed = e.shiftKey;
    if (isShiftPressed) {
      // Bypass confirmation
      handleDeleteClick(receipt.localReceiptId);
    } else {
      // Open confirmation modal
      setReceiptToDelete(receipt.localReceiptId);
      setIsConfirmModalOpen(true);
    }
  };

  // Confirm deletion
  const handleConfirmDelete = () => {
    if (receiptToDelete !== null) {
      handleDeleteClick(receiptToDelete);
      setReceiptToDelete(null);
      setIsConfirmModalOpen(false);
    }
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setReceiptToDelete(null);
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <motion.tr
        onClick={() => toggleRow(receipt.localReceiptId)}
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
        {/* Receipt ID and Expander Icon */}
        <td className="py-5 text-sm font-medium text-black flex items-center ">
          <motion.div
            variants={chevronVariants}
            animate={
              isRowExpanded(receipt.localReceiptId) ? "rotated" : "default"
            }
            transition={{ duration: 0.2 }}
            className="mr-2"
          >
            <ChevronRight size={18} />
          </motion.div>
          {receipt.localReceiptId}
        </td>

        {/* Render editable cells */}
        <EditableCell
          isEditing={isEditing}
          value={isEditing ? editedItem.location : receipt.location}
          name="location"
          onChange={handleInputChange}
        />
        <EditableCell
          isEditing={isEditing}
          value={isEditing ? editedItem.date : receipt.date}
          name="date"
          onChange={handleInputChange}
        />
        <EditableCell
          isEditing={isEditing}
          value={isEditing ? editedItem.time : receipt.time}
          name="time"
          onChange={handleInputChange}
        />
        <EditableCell
          isEditing={isEditing}
          value={isEditing ? editedItem.cost : receipt.cost}
          name="cost"
          onChange={handleInputChange}
        />

        {/* Actions Column */}
        <ActionButtons
          isEditing={isEditing}
          onEdit={(e) => {
            e.stopPropagation();
            handleEditClick();
          }}
          onSave={(e) => {
            e.stopPropagation();
            handleSaveClick();
          }}
          onCancel={(e) => {
            e.stopPropagation();
            handleCancelClick();
          }}
          onDelete={(e) => {
            onDelete(e);
          }}
        />
      </motion.tr>

      {/* Expanded Row with Details */}
      {isRowExpanded(receipt.localReceiptId) && (
        <motion.tr
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <td colSpan={6} className="py-2 rounded-xl">
            <ReceiptDetails
              details={receipt.details}
              onItemDelete={(itemIndex) =>
                onItemDelete(receipt.localReceiptId, itemIndex)
              }
            />
          </td>
        </motion.tr>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this receipt? This action cannot be undone."
        proTip="Pro Tip: Hold down Shift while clicking Delete to bypass this confirmation."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default React.memo(ReceiptTableRow);
