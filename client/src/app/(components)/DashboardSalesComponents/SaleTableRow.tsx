// SaleTableRow.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Sale } from "@/app/types/types";
import { useEditable } from "@/app/hooks/useEditable";
import ActionButtons from "../Common/ActionButtons";
import EditableCell from "../Common/EditableCell";
import SaleDetails from "./SaleDetails";
import ConfirmModal from "../Common/ConfirmModal";
import ContextMenu from "../Common/ContextMenu";
import {
  chevronVariants,
  rowVariants,
  tableRowTransition,
} from "../Common/Animations";

interface SaleTableRowProps {
  sale: Sale;
  isRowExpanded: (id: number) => boolean;
  toggleRow: (id: number) => void;
  handleDeleteClick: (saleId: number) => void;
  index: number;
  setIsAnimating: (isAnimating: boolean) => void;
  onItemDelete: (saleId: number, itemIndex: number) => void;
  duplicateSale: (sale: Sale) => void;
}

const SaleTableRow: React.FC<SaleTableRowProps> = ({
  sale,
  isRowExpanded,
  toggleRow,
  handleDeleteClick,
  index,
  setIsAnimating,
  onItemDelete,
  duplicateSale,
}) => {
  const {
    isEditing,
    editedItem,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleInputChange,
  } = useEditable<Sale>(sale);

  // State for confirmation modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState<number | null>(null);

  // State for context menu
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  // Handler for delete button click
  const onDelete = (e: React.MouseEvent) => {
    const isShiftPressed = e.shiftKey;
    if (isShiftPressed) {
      // Bypass confirmation
      handleDeleteClick(sale.localSaleId);
    } else {
      // Open confirmation modal
      setSaleToDelete(sale.localSaleId);
      setIsConfirmModalOpen(true);
    }
    setIsContextMenuOpen(false); // Close context menu
  };

  // Confirm deletion
  const handleConfirmDelete = () => {
    if (saleToDelete !== null) {
      handleDeleteClick(saleToDelete);
      setSaleToDelete(null);
      setIsConfirmModalOpen(false);
    }
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setSaleToDelete(null);
    setIsConfirmModalOpen(false);
  };

  // Handler for right-click to open context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsContextMenuOpen(true);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <motion.tr
        onClick={() => toggleRow(sale.localSaleId)}
        onContextMenu={handleContextMenu} // Add right-click handler
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
        className="cursor-pointer border-b border-t border-white relative"
      >
        {/* Sale ID and Expander Icon */}
        <td className="py-5 text-sm font-medium text-black flex items-center ">
          <motion.div
            variants={chevronVariants}
            animate={isRowExpanded(sale.localSaleId) ? "rotated" : "default"}
            transition={{ duration: 0.2 }}
            className="mr-2"
          >
            <ChevronRight size={18} />
          </motion.div>
          {sale.localSaleId}
        </td>

        {/* Render editable cells */}
        <EditableCell
          isEditing={isEditing}
          value={isEditing ? editedItem.startDate : sale.startDate}
          name="startDate"
          onChange={handleInputChange}
        />
        <EditableCell
          isEditing={isEditing}
          value={isEditing ? editedItem.endDate : sale.endDate}
          name="endDate"
          onChange={handleInputChange}
        />
        <EditableCell
          isEditing={isEditing}
          value={isEditing ? editedItem.revenue : sale.revenue}
          name="revenue"
          onChange={handleInputChange}
        />

        <td className="py-5 text-sm text-black">
          {/* Hard-coded profit margin value */}
          <span className="text-gray-700">20%</span>
        </td>

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

      {/* Context Menu */}
      {isContextMenuOpen && (
        <ContextMenu
          options={["Edit", "Delete", "Duplicate"]}
          position={contextMenuPosition}
          onSelect={(option, e) => {
            switch (option) {
              case "Edit":
                handleEditClick();
                break;
              case "Delete":
                onDelete(e);
                break;
              case "Duplicate":
                duplicateSale(sale);
                break;
              default:
                break;
            }
            setIsContextMenuOpen(false);
          }}
          onClose={() => {
            setIsContextMenuOpen(false);
          }}
        />
      )}

      {/* Expanded Row with Details */}
      {isRowExpanded(sale.localSaleId) && (
        <motion.tr
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <td colSpan={6} className="py-2 rounded-xl">
            <SaleDetails
              details={sale.details}
              onItemDelete={(itemIndex) =>
                onItemDelete(sale.localSaleId, itemIndex)
              }
            />
          </td>
        </motion.tr>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this sale? This action cannot be undone."
        proTip="Pro Tip: Hold down Shift while clicking Delete to bypass this confirmation."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default React.memo(SaleTableRow);
