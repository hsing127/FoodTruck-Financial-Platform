import React from 'react';
import { motion } from 'framer-motion';
import EditableCell from '../Common/EditableCell';
import ActionButtons from '../Common/ActionButtons';
import { Ingredient } from '@/app/types/types';
import { useEditable } from "@/app/hooks/useEditable"

interface IngredientRowProps {
  ingredient: Ingredient;
  index: number;
  onItemEdit: (index: number, updatedItem: Ingredient) => void;
  onItemDelete: (index: number) => void;
}

const rowVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const IngredientRow: React.FC<IngredientRowProps> = ({
  ingredient,
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
  } = useEditable<Ingredient>(ingredient);

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
    transition={{
      delay: index * 0.1,
      duration: 0.3,
    }}
    >
      <EditableCell
        isEditing={isEditing}
        value={isEditing ? editedItem.ingredient : ingredient.ingredient}
        name="ingredient"
        onChange={handleInputChange}
      />
      <EditableCell
        isEditing={isEditing}
        value={isEditing ? editedItem.quantity : ingredient.quantity}
        name="quantity"
        onChange={handleInputChange}
        type="number"
      />
      <EditableCell
        isEditing={isEditing}
        value={isEditing ? editedItem.units : ingredient.units}
        name="units"
        onChange={handleInputChange}
      />
      <EditableCell
        isEditing={isEditing}
        value={isEditing ? editedItem.price : ingredient.price}
        name="price"
        onChange={handleInputChange}
      />
      <ActionButtons
        isEditing={isEditing}
        onEdit={handleEditClick}
        onSave={handleSave}
        onCancel={handleCancelClick}
        onDelete={() => onItemDelete(index)}
      />
    </motion.tr>
  );
};

export default IngredientRow;
