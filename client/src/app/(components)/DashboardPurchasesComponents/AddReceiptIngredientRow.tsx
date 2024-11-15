import React from "react";
import EditableCell from "../Common/EditableCell";
import { X } from "lucide-react";
import { ReceiptItem } from "@/app/types/types";
import { motion } from "framer-motion";
import { ingredientRowVariants } from "../Common/Animations";

interface AddReceiptIngredientRowProps {
  index: number;
  ingredient: ReceiptItem;
  handleIngredientChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleDeleteIngredient: (index: number) => void;
}

const AddReceiptIngredientRow: React.FC<AddReceiptIngredientRowProps> = ({
  index,
  ingredient,
  handleIngredientChange,
  handleDeleteIngredient,
}) => {
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
        isEditing={true}
        value={ingredient.ingredient}
        name="ingredient"
        onChange={(e) => handleIngredientChange(index, e)}
        placeholder="Ingredient"
      />

      <EditableCell
        isEditing={true}
        value={ingredient.quantity.toString()}
        name="quantity"
        onChange={(e) => handleIngredientChange(index, e)}
        type="number"
        placeholder="Quantity"
      />

      <EditableCell
        isEditing={true}
        value={ingredient.units}
        name="units"
        onChange={(e) => handleIngredientChange(index, e)}
        placeholder="Units"
      />

      <EditableCell
        isEditing={true}
        value={ingredient.price}
        name="price"
        onChange={(e) => handleIngredientChange(index, e)}
        type="text"
        placeholder="Price"
      />

      <td className="pl-2 pt-2 text-sm text-black">
        <button
          className="text-red-600 hover:text-red-800"
          onClick={() => handleDeleteIngredient(index)}
          title="Delete Ingredient"
        >
          <X size={20} />
        </button>
      </td>
    </motion.tr>
  );
};

export default AddReceiptIngredientRow;
