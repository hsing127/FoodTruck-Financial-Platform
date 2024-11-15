import React from "react";
import EditableCell from "../Common/EditableCell";
import { X } from "lucide-react";
import { Ingredient } from "@/app/types/types";
import { motion } from "framer-motion";
import { useEditable } from "@/app/hooks/useEditable";
import ActionButtons from "../Common/ActionButtons";
import { ingredientRowVariants } from "../Common/Animations";

interface IngredientRowProps {
  index: number;
  ingredient: Ingredient;
  onItemEdit: (index: number, updatedItem: Ingredient) => void;
  onItemDelete: (index: number) => void;
}

const IngredientRow: React.FC<IngredientRowProps> = ({
  index,
  ingredient,
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
      className="bg-white"
      variants={ingredientRowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
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
