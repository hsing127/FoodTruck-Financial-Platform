import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { Receipt } from "@/app/types/types";
import { useEditable } from "@/app/hooks/useEditable";
import ActionButtons from "../Common/ActionButtons";
import EditableCell from "../Common/EditableCell";
import ReceiptDetails from "./ReceiptDetails";

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

// Animation variants
const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

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
          duration: 0.3,
          onStart: () => setIsAnimating(true),
          onComplete: () => setIsAnimating(false),
        }}
        className="cursor-pointer border-b border-t border-white"
      >
        {/* Receipt ID and Expander Icon */}
        <td className="py-5 text-sm font-medium text-black flex items-center ">
          <motion.div
            initial={false}
            animate={{ rotate: isRowExpanded(receipt.localReceiptId) ? 90 : 0 }}
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
            e.stopPropagation();
            handleDeleteClick(receipt.localReceiptId);
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
    </>
  );
};

export default React.memo(ReceiptTableRow);
