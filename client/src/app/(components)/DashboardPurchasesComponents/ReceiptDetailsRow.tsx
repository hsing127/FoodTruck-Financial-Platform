import React from "react";
import { motion } from "framer-motion";
import EditableCell from "../Common/EditableCell";
import ActionButtons from "../Common/ActionButtons";
import { ReceiptItem } from "@/app/types/types";
import { ingredientRowVariants } from "../Common/Animations";

interface ReceiptDetailsRowProps {
  item: ReceiptItem;
  index: number;
  isEditing: boolean;
  editedItem: ReceiptItem | null;
  onEditClick: (index: number, item: ReceiptItem) => void;
  onSaveClick: (index: number) => void;
  onCancelClick: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onItemDelete: (index: number) => void;
}

const ReceiptDetailsRow: React.FC<ReceiptDetailsRowProps> = ({
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
  const currentItem = isEditing && editedItem ? editedItem : item;

  return (
    <motion.tr
      variants={ingredientRowVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{
        delay: index * 0.1,
        duration: 0.3,
      }}
    >
      <EditableCell
        isEditing={isEditing}
        value={currentItem.ingredient}
        name="ingredient"
        onChange={handleInputChange}
      />
      <EditableCell
        isEditing={isEditing}
        value={currentItem.quantity}
        name="quantity"
        onChange={handleInputChange}
        type="number"
      />
      <EditableCell
        isEditing={isEditing}
        value={currentItem.units}
        name="units"
        onChange={handleInputChange}
      />
      <EditableCell
        isEditing={isEditing}
        value={currentItem.price}
        name="price"
        onChange={handleInputChange}
      />
      <ActionButtons
        isEditing={isEditing}
        onEdit={(e) => {
          e.stopPropagation(); // Prevents row toggle
          onEditClick(index, item);
        }}
        onSave={(e) => {
          e.stopPropagation(); // Prevents row toggle
          onSaveClick(index);
        }}
        onCancel={(e) => {
          e.stopPropagation(); // Prevents row toggle
          onCancelClick();
        }}
        onDelete={(e) => {
          e.stopPropagation(); // Prevents row toggle
          onItemDelete(index);
        }}
      />
    </motion.tr>
  );
};

export default ReceiptDetailsRow;
