import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Edit, Save, Trash2, X } from "lucide-react";
import ReceiptDetails from "./ReceiptDetails";

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
}

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

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
}) => {
  const isEditing = editingReceiptId === receipt.localReceiptId;

  // Toggle row expansion if not editing
  const onRowClick = () => !isEditing && toggleRow(receipt.localReceiptId);

  // Prevent event propagation to keep row closed during edit or delete
  const preventEventPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const renderInputOrText = (field: string, value: string) =>
    isEditing ? (
      <td className="py-2 text-sm text-black">
        <input
          type="text"
          name={field}
          value={value}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
          onClick={preventEventPropagation}
        />
      </td>
    ) : (
      <td className="py-2 text-sm text-black">{value}</td>
    );

  return (
    <>
      <motion.tr
        onClick={onRowClick}
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
        className="cursor-pointer"
        style={{ overflow: "hidden" }}
      >
        <td className="py-5 text-sm font-medium text-black flex items-center">
          <motion.div
            initial={false}
            animate={{ rotate: isRowExpanded(receipt.localReceiptId) ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="mr-2"
          >
            <ChevronRight size={18} />
          </motion.div>
          {receipt.localReceiptId} {/* Display the sequential ID */}
        </td>

        {/* Display location, formatted date, formatted time, and cost */}
        <td className="py-2 text-sm text-black">{receipt.location}</td>
        <td className="py-2 text-sm text-black">{receipt.date}</td> {/* Formatted date */}
        <td className="py-2 text-sm text-black">{receipt.time}</td> {/* Formatted time */}
        <td className="py-2 text-sm text-black">{receipt.cost}</td>

        <td className="pl-2 py-2 text-sm text-black">
          {isEditing ? (
            <>
              <button
                className="mr-2 text-green-600"
                onClick={(e) => {
                  preventEventPropagation(e);
                  handleSaveClick();
                }}
              >
                <Save size={18} />
              </button>
              <button
                className="text-red-600"
                onClick={(e) => {
                  preventEventPropagation(e);
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
                  preventEventPropagation(e);
                  handleEditClick(receipt);
                }}
              >
                <Edit size={18} />
              </button>
              <button
                className="text-red-400 hover:text-red-500"
                onClick={(e) => {
                  preventEventPropagation(e);
                  handleDeleteClick(receipt.localReceiptId);
                }}
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </td>
      </motion.tr>

      {isRowExpanded(receipt.localReceiptId) && (
        <motion.tr
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
          onAnimationStart={() => setIsAnimating(true)}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          <td colSpan={6} className="py-2 bg-white-50 rounded-xl">
            <ReceiptDetails details={receipt.details} />
          </td>
        </motion.tr>
      )}
    </>
  );
};

export default ReceiptTableRow;
