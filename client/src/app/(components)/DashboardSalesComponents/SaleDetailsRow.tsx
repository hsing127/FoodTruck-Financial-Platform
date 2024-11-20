import React from "react";
import { motion } from "framer-motion";
import EditableCell from "../Common/EditableCell";
import ActionButtons from "../Common/ActionButtons";
import { SaleItem } from "@/app/types/types";
import { menuItemRowVariants } from "../Common/Animations";

interface SaleDetailsRowProps {
  item: SaleItem;
  index: number;
  isEditing: boolean;
  editedItem: SaleItem | null;
  onEditClick: (index: number, item: SaleItem) => void;
  onSaveClick: (index: number) => void;
  onCancelClick: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onItemDelete: (index: number) => void;
}

const SaleDetailsRow: React.FC<SaleDetailsRowProps> = ({
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
      variants={menuItemRowVariants}
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
        value={currentItem.menuitemname}
        name="menuItem"
        onChange={handleInputChange}
          />
          <td className="py-5 text-sm font-medium text-black flex items-left ">
          
          </td>
      <EditableCell
        isEditing={isEditing}
        value={currentItem.count}
        name="quantity"
        onChange={handleInputChange}
        type="number"
          />
          <td className="py-5 text-sm font-medium text-black flex items-center ">
          {currentItem.itemrevenue}
          </td>
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

export default SaleDetailsRow;
