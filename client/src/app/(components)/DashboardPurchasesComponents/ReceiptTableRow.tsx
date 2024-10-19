import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Edit, Save, Trash2, X } from "lucide-react";
import ReceiptDetails from "./ReceiptDetails";

// Define the type for ReceiptTableRow component props
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
}

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
}) => {
  // Toggle row expansion when clicked, if not in editing mode
  const onRowClick = () => {
    if (editingReceiptId !== receipt.receiptId) {
      toggleRow(receipt.receiptId);
    }
  };

  // Prevent event propagation when interacting with inputs or buttons
  const preventEventPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <React.Fragment key={receipt.receiptId}>
      <tr className="cursor-pointer" onClick={onRowClick}>
        <td className="py-5 text-sm font-medium text-black flex items-center">
          <motion.div
            initial={false}
            animate={{ rotate: isRowExpanded(receipt.receiptId) ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="mr-2"
          >
            <ChevronRight size={18} />
          </motion.div>
          {receipt.receiptId}
        </td>

        {/* Conditional rendering for edit mode or normal mode */}
        {editingReceiptId === receipt.receiptId ? (
          <>
            <td className="py-2 text-sm text-black">
              <input
                type="text"
                name="location"
                value={editedReceipt.location}
                onChange={handleInputChange}
                className="lg:w-24 p-1 border border-white"
                onClick={preventEventPropagation}
              />
            </td>
            <td className="py-2 text-sm text-black">
              <input
                type="text"
                name="date"
                value={editedReceipt.date}
                onChange={handleInputChange}
                className="lg:w-24 p-1 border border-white"
                onClick={preventEventPropagation}
              />
            </td>
            <td className="py-2 text-sm text-black">
              <input
                type="text"
                name="time"
                value={editedReceipt.time}
                onChange={handleInputChange}
                className="lg:w-24 p-1 border border-white"
                onClick={preventEventPropagation}
              />
            </td>
            <td className="py-2 text-sm text-black">
              <input
                type="text"
                name="cost"
                value={editedReceipt.cost}
                onChange={handleInputChange}
                className="lg:w-24 p-1 border border-white"
                onClick={preventEventPropagation}
              />
            </td>
            <td className="py-2 text-sm text-black">
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
            </td>
          </>
        ) : (
          <>
            <td className="py-2 text-sm text-black">{receipt.location}</td>
            <td className="py-2 text-sm text-black">{receipt.date}</td>
            <td className="py-2 text-sm text-black">{receipt.time}</td>
            <td className="py-2 text-sm text-black">{receipt.cost}</td>
            <td className="py-2 text-sm text-black">
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
                className="text-red-400 hover:text-red-300"
                onClick={(e) => {
                  preventEventPropagation(e);
                  handleDeleteClick(receipt.receiptId);
                }}
              >
                <Trash2 size={18} />
              </button>
            </td>
          </>
        )}
      </tr>

      {/* Expandable row for showing detailed receipt information */}
      {isRowExpanded(receipt.receiptId) && (
        <motion.tr
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          <td colSpan={6} className="py-2 bg-white-50 rounded-xl">
            <ReceiptDetails details={receipt.details} />
          </td>
        </motion.tr>
      )}
    </React.Fragment>
  );
};

export default ReceiptTableRow;
