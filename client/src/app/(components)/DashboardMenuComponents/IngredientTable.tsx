import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Save, X } from "lucide-react";
import IngredientRow from "./IngredientRow";
import EditableCell from "../Common/EditableCell";
import { Ingredient } from "@/app/types/types";
import { tableVariants } from "../Common/Animations";

interface IngredientTableProps {
  ingredients: Ingredient[];
  onItemEdit: (index: number, updatedItem: Ingredient) => void;
  onItemDelete: (index: number) => void;
  onItemAdd: (newItem: Ingredient) => void;
}

const IngredientTable: React.FC<IngredientTableProps> = ({
  ingredients,
  onItemEdit,
  onItemDelete,
  onItemAdd,
}) => {
  const [newItem, setNewItem] = useState<Ingredient | null>(null);

  const handleNewInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleAddNewItem = () => {
    if (newItem) {
      onItemAdd(newItem);
      setNewItem(null);
    }
  };

  return (
    <div>
      <motion.table className="w-full mt-4" variants={tableVariants}>
        <thead>
          <tr>
            <th className="w-1/4 text-left text-sm font-medium text-black">
              Ingredient
            </th>
            <th className="w-1/4 text-left text-sm font-medium text-black">
              Quantity
            </th>
            <th className="w-1/4 text-left text-sm font-medium text-black">
              Units
            </th>
            <th className="w-1/4 text-left text-sm font-medium text-black">
              Price
            </th>
            <th className="text-left text-sm font-medium text-black px-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient, idx) => (
            <IngredientRow
              key={idx}
              ingredient={ingredient}
              index={idx}
              onItemEdit={onItemEdit}
              onItemDelete={onItemDelete}
            />
          ))}
          {newItem && (
            <motion.tr
              className="bg-white"
              variants={tableVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <EditableCell
                isEditing={true}
                value={newItem.ingredient || ""}
                name="ingredient"
                onChange={handleNewInputChange}
                placeholder="Ingredient Name"
              />
              <EditableCell
                isEditing={true}
                value={newItem.quantity || ""}
                name="quantity"
                onChange={handleNewInputChange}
                type="number"
                placeholder="Quantity"
              />
              <EditableCell
                isEditing={true}
                value={newItem.units || ""}
                name="units"
                onChange={handleNewInputChange}
                placeholder="Units (e.g., kg, lbs)"
              />
              <EditableCell
                isEditing={true}
                value={newItem.price || ""}
                name="price"
                onChange={handleNewInputChange}
                placeholder="Price"
              />
              <td className="pl-2 py-3 text-sm text-black">
                <button
                  className="mr-2 text-green-600"
                  onClick={handleAddNewItem}
                >
                  <Save size={20} />
                </button>
                <button
                  className="text-red-600"
                  onClick={() => setNewItem(null)}
                >
                  <X size={20} />
                </button>
              </td>
            </motion.tr>
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
