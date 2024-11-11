import React from "react";
import { motion } from "framer-motion";
import ReceiptTableRow from "./ReceiptTableRow";
import Pagination from "../Common/Pagination";

interface ReceiptTableContentProps {
  filteredReceipts: any[];
  currentReceipts: any[];
  currentPage: number;
  totalPages: number;
  editingReceiptId: number | null;
  handleEditClick: (receipt: any) => void;
  handleSaveClick: () => void;
  handleCancelClick: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editedReceipt: any;
  handleDeleteClick: (localReceiptId: number) => void;
  handleItemDelete: (receiptId: number, itemIndex: number) => void;
  isRowExpanded: (id: number) => boolean;
  toggleRow: (id: number) => void;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const ReceiptTableContent: React.FC<ReceiptTableContentProps> = ({
  filteredReceipts,
  currentReceipts,
  currentPage,
  totalPages,
  editingReceiptId,
  handleEditClick,
  handleSaveClick,
  handleCancelClick,
  handleInputChange,
  editedReceipt,
  handleDeleteClick,
  handleItemDelete,
  isRowExpanded,
  toggleRow,
  setIsAnimating,
  setCurrentPage,
}) => {
  return (
    <>
      <table className="min-w-full divide-y divide-white">
        <thead>
          <tr>
            <th className="pl-7 text-left w-1/5 py-2 text-xs font-medium text-black uppercase tracking-wider">
              Receipt ID
            </th>
            <th className="text-left w-1/5 text-xs font-medium text-black uppercase tracking-wider">
              Location
            </th>
            <th className="text-left w-1/5 text-xs font-medium text-black uppercase tracking-wider">
              Date
            </th>
            <th className="text-left w-1/5 text-xs font-medium text-black uppercase tracking-wider">
              Time
            </th>
            <th className="text-left w-1/5 text-xs font-medium text-black uppercase tracking-wider">
              Cost
            </th>
            <th className="w-[100px] text-left text-xs font-medium text-black uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <motion.tbody
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
          }}
          onAnimationComplete={() => setIsAnimating(false)}
          key={currentPage}
        >
          {currentReceipts.map((receipt, index) => (
            <ReceiptTableRow
              key={receipt.localReceiptId}
              receipt={receipt}
              isRowExpanded={isRowExpanded}
              toggleRow={toggleRow}
              editingReceiptId={editingReceiptId}
              handleEditClick={handleEditClick}
              handleSaveClick={handleSaveClick}
              handleCancelClick={handleCancelClick}
              handleInputChange={handleInputChange}
              editedReceipt={editedReceipt}
              handleDeleteClick={handleDeleteClick}
              onItemDelete={handleItemDelete} // Pass down handleItemDelete
              index={index}
              setIsAnimating={setIsAnimating}
            />
          ))}
        </motion.tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={setCurrentPage}
      />
    </>
  );
};

export default ReceiptTableContent;
