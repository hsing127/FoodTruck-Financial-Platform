import React from "react";
import EditableCell from "../Common/EditableCell";
import { Ingredient } from "@/app/types/types";
import { X } from "lucide-react";

interface MenuItemIngredientRowProps {
  ingredient: Ingredient;
  index: number;
  onChange: (index: number, updatedIngredient: Ingredient) => void;
  onDelete: (index: number) => void;
}

const MenuItemIngredientRow: React.FC<MenuItemIngredientRowProps> = ({
  ingredient,
  index,
  onChange,
  onDelete,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedIngredient: Ingredient = {
      ...ingredient,
      [name]: name === "quantity" ? parseFloat(value) || 0 : value,
    };
    onChange(index, updatedIngredient);
  };

  return (
    <tr className="bg-white">
      <EditableCell
        isEditing={true}
        value={ingredient.ingredient}
        name="ingredient"
        onChange={handleInputChange}
        placeholder="Ingredient Name"
      />
      <EditableCell
        isEditing={true}
        value={ingredient.quantity}
        name="quantity"
        onChange={handleInputChange}
        type="number"
        placeholder="Quantity"
      />
      <EditableCell
        isEditing={true}
        value={ingredient.units}
        name="units"
        onChange={handleInputChange}
        placeholder="Units (e.g., kg, lbs)"
      />
      <EditableCell
        isEditing={true}
        value={ingredient.price}
        name="price"
        onChange={handleInputChange}
        placeholder="Price"
      />
      <td className="pl-2 py-3 text-sm text-black">
        <button
          className="text-red-600"
          onClick={() => onDelete(index)}
          aria-label="Delete Ingredient"
        >
          <X size={20} />
        </button>
      </td>
    </tr>
  );
};

export default MenuItemIngredientRow;
