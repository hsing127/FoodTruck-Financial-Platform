import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, X, Edit, Trash2, Plus } from "lucide-react";
import { Ingredient } from "../../types/types";
import TableHeader from "../Common/TableHeader";
import TableRow from "../Common/TableRow";
import EditableCell from "../Common/EditableCell";
import ActionButton from "../Common/ActionButton";
import useEditableItem from "../../hooks/useEditableItem";
import { rowVariants } from "../../utils/animationVariants";

interface IngredientTableProps {
  ingredients: Ingredient[];
  onItemEdit?: (index: number, updatedItem: Ingredient) => void;
  onItemDelete?: (index: number) => void;
  onItemAdd?: (newItem: Ingredient) => void;
}

const IngredientTable: React.FC<IngredientTableProps> = ({
  ingredients,
  onItemEdit,
  onItemDelete,
  onItemAdd,
}) => {
  const {
    editingIndex,
    editedItem,
    handleEditClick,
    handleSaveClick,
    resetEditing,
    handleInputChange,
  } = useEditableItem<Ingredient>({ onItemEdit });

  const [newItem, setNewItem] = useState<Ingredient | null>(null);

  const handleNewInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) =>
      prev
        ? { ...prev, [name]: value }
        : { ingredient: "", quantity: 0, units: "", price: "" }
    );
  };

  const handleAddNewItem = () => {
    if (onItemAdd && newItem) {
      onItemAdd(newItem);
      setNewItem(null);
    }
  };

  const renderEditingRowCells = (idx: number) =>
    ["ingredient", "quantity", "units", "price"]
      .map((field) => (
        <EditableCell
          key={field}
          type={field === "quantity" ? "number" : "text"}
          name={field}
          value={editedItem ? editedItem[field as keyof Ingredient] : ""}
          onChange={handleInputChange}
        />
      ))
      .concat(
        <td key="actions" className="py-2 text-sm text-black">
          <ActionButton
            icon={<Save size={18} />}
            onClick={() => handleSaveClick(idx)}
            className="pl-2 mr-2 text-green-600"
          />
          <ActionButton
            icon={<X size={18} />}
            onClick={resetEditing}
            className="text-red-600"
          />
        </td>
      );

  const renderDefaultRowCells = (ingredient: Ingredient, idx: number) => [
    <td key="ingredient" className="py-3 text-sm text-black">
      {ingredient.ingredient}
    </td>,
    <td key="quantity" className="py-3 text-sm text-black">
      {ingredient.quantity}
    </td>,
    <td key="units" className="py-3 text-sm text-black">
      {ingredient.units}
    </td>,
    <td key="price" className="py-3 text-sm text-black">
      {ingredient.price}
    </td>,
    <td key="actions" className="py-3 text-sm text-black">
      <ActionButton
        icon={<Edit size={18} />}
        onClick={() => handleEditClick(idx, ingredient)}
        className="pl-2 mr-2 text-[#8B5CF6] hover:text-[#b07ff0]"
      />
      <ActionButton
        icon={<Trash2 size={18} />}
        onClick={() => onItemDelete && onItemDelete(idx)}
        className="text-red-400 hover:text-red-500"
      />
    </td>,
  ];

  return (
    <div className="mt-4">
      <motion.table className="min-w-full overflow-hidden">
        <TableHeader
          headers={["Ingredient", "Quantity", "Units", "Price", "Actions"]}
        />
        <tbody>
          {ingredients.map((ingredient, idx) => (
            <TableRow
              key={idx}
              cells={
                editingIndex === idx
                  ? renderEditingRowCells(idx)
                  : renderDefaultRowCells(ingredient, idx)
              }
              rowIndex={idx}
              variants={rowVariants}
            />
          ))}
          {newItem && (
            <tr className="bg-white">
              {["ingredient", "quantity", "units", "price"].map((field) => (
                <td key={field} className="py-3 text-sm text-black">
                  <input
                    type={field === "quantity" ? "number" : "text"}
                    name={field}
                    value={newItem[field as keyof Ingredient]}
                    onChange={handleNewInputChange}
                    placeholder={`Enter ${field}`}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                  />
                </td>
              ))}
              <td className="pl-2 py-2 text-sm text-black">
                <ActionButton
                  icon={<Save size={20} />}
                  onClick={handleAddNewItem}
                  className="mr-1 text-green-600"
                />
                <ActionButton
                  icon={<X size={20} />}
                  onClick={() => setNewItem(null)}
                  className="text-red-600"
                />
              </td>
            </tr>
          )}
        </tbody>
      </motion.table>
      <div className="flex justify-end mt-4">
        <button
          onClick={() =>
            setNewItem({ ingredient: "", quantity: 0, units: "", price: "" })
          }
          className="flex items-center text-sm text-blue-500 font-medium hover:text-blue-700"
        >
          <Plus size={20} className="mr-1" /> Add Ingredient
        </button>
      </div>
    </div>
  );
};

export default IngredientTable;
