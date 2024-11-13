import React from "react";
import { motion } from "framer-motion";
import EditableCell from "../Common/EditableCell";
import ActionButtons from "../Common/ActionButtons";
import { InventoryItem } from "@/app/types/types";
import { useEditable } from "@/app/hooks/useEditable";

interface InventoryTableRowProps {
  item: InventoryItem;
  index: number;
  onItemEdit: (index: number, updatedItem: InventoryItem) => void;
  onItemDelete: (index: number) => void;
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
}) => {
  const {
    isEditing,
    editedItem,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleInputChange,
  } = useEditable<InventoryItem>(item);

  const handleSave = (e: React.MouseEvent) => {
    handleSaveClick();
    onItemEdit(index, editedItem);
  };

  return (
    <motion.tr
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ delay: index * 0.05, duration: 0.3 }}
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
        onSave={(e) => {
          e.stopPropagation();
          handleSave(e);
        }}
        onCancel={(e) => {
          e.stopPropagation();
          handleCancelClick();
        }}
        onDelete={(e) => {
          e.stopPropagation();
          onItemDelete(index);
        }}
      />
    </motion.tr>
  );
};

export default InventoryTableRow;
