import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, Trash2, Edit, Plus, X } from "lucide-react";

// Define the Ingredient type for each ingredient's details
interface Ingredient {
  ingredient: string;
  quantity: number;
  units: string;
  price: string;
}

// Props for IngredientTable component, including handlers for editing and adding ingredients
interface IngredientTableProps {
  ingredients: Ingredient[];
  onItemEdit?: (index: number, updatedItem: Ingredient) => void;
  onItemDelete?: (index: number) => void;
  onItemAdd?: (newItem: Ingredient) => void;
}

// Animation variants for table row transitions
const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// IngredientTable component for managing and displaying ingredients
const IngredientTable: React.FC<IngredientTableProps> = ({
  ingredients,
  onItemEdit,
  onItemDelete,
  onItemAdd,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track which item is being edited
  const [editedItem, setEditedItem] = useState<Ingredient | null>(null); // Store details of item being edited
  const [newItem, setNewItem] = useState<Ingredient | null>(null); // Track new item being added

  // Handler to edit an existing ingredient item
  const handleEditClick = (index: number, item: Ingredient) => {
    setEditingIndex(index);
    setEditedItem({ ...item });
  };

  // Save edited item and reset editing state
  const handleSaveClick = (index: number) => {
    if (onItemEdit && editedItem) onItemEdit(index, editedItem);
    resetEditing();
  };

  // Reset editing state and clear edited item
  const resetEditing = () => {
    setEditingIndex(null);
    setEditedItem(null);
  };

  // Handle input changes for both editing and adding items
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedItem((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleNewInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) =>
      prev
        ? { ...prev, [name]: value }
        : { ingredient: "", quantity: 0, units: "", price: "" }
    );
  };

  // Add a new item and clear input fields
  const handleAddNewItem = () => {
    if (onItemAdd && newItem) onItemAdd(newItem);
    setNewItem(null);
  };

  return (
    <div>
      <motion.table className="w-full mt-4">
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
          {ingredients.map((ingredient, idx) => {
            const isEditing = editingIndex === idx;
            return (
              <motion.tr
                key={idx}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {isEditing ? (
                  ["ingredient", "quantity", "units", "price"].map((field) => (
                    <td key={field} className="py-3 text-sm text-black">
                      <input
                        type={field === "quantity" ? "number" : "text"}
                        name={field}
                        value={
                          editedItem
                            ? editedItem[field as keyof Ingredient]
                            : ""
                        }
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                      />
                    </td>
                  ))
                ) : (
                  <>
                    <td className="py-3 text-sm text-black">
                      {ingredient.ingredient}
                    </td>
                    <td className="py-3 text-sm text-black">
                      {ingredient.quantity}
                    </td>
                    <td className="py-3 text-sm text-black">
                      {ingredient.units}
                    </td>
                    <td className="py-3 text-sm text-black">
                      {ingredient.price}
                    </td>
                    <td className="py-3 text-sm text-black">
                      <button
                        className="pl-2 mr-2 text-[#8B5CF6] hover:text-[#b07ff0]"
                        onClick={() => handleEditClick(idx, ingredient)}
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        className="text-red-400 hover:text-red-500"
                        onClick={() => onItemDelete && onItemDelete(idx)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </>
                )}
              </motion.tr>
            );
          })}
          {newItem && (
            <tr className="bg-white">
              <td className="py-3 text-sm text-black">
                <input
                  type="text"
                  name="ingredient"
                  placeholder="Ingredient"
                  value={newItem.ingredient}
                  onChange={handleNewInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                />
              </td>
              <td className="py-3 text-sm text-black">
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={newItem.quantity}
                  onChange={handleNewInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                />
              </td>
              <td className="py-3 text-sm text-black">
                <input
                  type="text"
                  name="units"
                  placeholder="Units"
                  value={newItem.units}
                  onChange={handleNewInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                />
              </td>
              <td className="py-3 text-sm text-black">
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={handleNewInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                />
              </td>
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
