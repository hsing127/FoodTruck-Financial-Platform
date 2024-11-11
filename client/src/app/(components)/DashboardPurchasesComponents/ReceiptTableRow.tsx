import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Edit, Save, Trash2, X } from "lucide-react";
import ReceiptDetails from "./ReceiptDetails";

// Define types for props
interface ReceiptTableRowProps {
  receipt: any;
  isRowExpanded: (id: number) => boolean;
  toggleRow: (id: number) => void;
  editingReceiptId: number | null;
  handleEditClick: (receipt: any) => void;
  handleSaveClick: () => void;
  handleCancelClick: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editedReceipt: any;
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

// Render input field or text based on edit state
const renderInputOrText = (
  isEditing: boolean,
  field: string,
  value: string,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
  return isEditing ? (
    <td className="py-2 text-sm text-black">
      <input
        type="text"
        name={field}
        value={value}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
      />
    </td>
  ) : (
    <td className="py-2 text-sm text-black">{value}</td>
  );
};

// Main component
const ReceiptTableRow: React.FC<ReceiptTableRowProps> = ({
  receipt,
  isRowExpanded,
  toggleRow,
  editingReceiptId,
  handleEditClick,
  handleSaveClick,
  handleCancelClick,
  handleInputChange,
  editedReceipt,
  handleDeleteClick,
  index,
  setIsAnimating,
  onItemDelete,
}) => {
  const isEditing = editingReceiptId === receipt.localReceiptId;

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

        {/* Render editable cells for Location, Date, Time, and Cost */}
        {renderInputOrText(
          isEditing,
          "location",
          isEditing ? editedReceipt.location : receipt.location,
          handleInputChange
        )}
        {renderInputOrText(
          isEditing,
          "date",
          isEditing ? editedReceipt.date : receipt.date,
          handleInputChange
        )}
        {renderInputOrText(
          isEditing,
          "time",
          isEditing ? editedReceipt.time : receipt.time,
          handleInputChange
        )}
        {renderInputOrText(
          isEditing,
          "cost",
          isEditing ? editedReceipt.cost : receipt.cost,
          handleInputChange
        )}

        {/* Actions Column */}
        <td className="pl-2 py-4 text-sm text-black">
          {isEditing ? (
            <>
              <button
                className="mr-2 text-green-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveClick();
                }}
              >
                <Save size={18} />
              </button>
              <button
                className="text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancelClick();
                }}
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                className="mr-2 text-[#8B5CF6] hover:text-[#b07ff0]"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick(receipt);
                }}
              >
                <Edit size={18} />
              </button>
              <button
                className="text-red-400 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(receipt.localReceiptId);
                }}
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </td>
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

export default ReceiptTableRow;
