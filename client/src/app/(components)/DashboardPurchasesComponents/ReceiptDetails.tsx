import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Save, X } from "lucide-react";

// Define the type for ReceiptDetails component props
interface ReceiptDetailsProps {
  details: {
    ingredient: string;
    quantity: number;
    units: string;
    price: string;
  }[];
  onItemEdit?: (
    index: number,
    updatedItem: {
      ingredient: string;
      quantity: number;
      units: string;
      price: string;
    }
  ) => void;
  onItemDelete?: (index: number) => void;
}

// Animation variants for table rows
const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// Define the functional component ReceiptDetails
const ReceiptDetails: React.FC<ReceiptDetailsProps> = ({
  details,
  onItemEdit,
  onItemDelete,
}) => {
  // State to track the editing index and edited item
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<{
    ingredient: string;
    quantity: number;
    units: string;
    price: string;
  } | null>(null);

  // Handle edit button click
  const handleEditClick = (index: number, item: any) => {
    setEditingIndex(index);
    setEditedItem({ ...item });
  };

  // Handle save button click
  const handleSaveClick = (index: number) => {
    if (onItemEdit && editedItem) {
      onItemEdit(index, editedItem);
    }
    resetEditing();
  };

  // Handle cancel button click
  const resetEditing = () => {
    setEditingIndex(null);
    setEditedItem(null);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedItem((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  return (
    <motion.table className="min-w-full mt-4 overflow-hidden">
      <thead>
        <tr>
          <th className="pl-7 w-1/4 text-left text-xs font-medium text-black uppercase tracking-wider">
            Ingredient
          </th>
          <th className="text-left w-1/4 text-xs font-medium text-black uppercase tracking-wider">
            Quantity
          </th>
          <th className="text-left w-1/4 text-xs font-medium text-black uppercase tracking-wider">
            Units
          </th>
          <th className="text-left w-1/4 text-xs font-medium text-black uppercase tracking-wider">
            Price
          </th>
          <th className="pr-6 text-left text-xs font-medium text-black uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {/* Loop through details to create rows */}
        {details.map((detail, idx) => {
          const isEditing = editingIndex === idx;
          return (
            <motion.tr
              key={idx}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ delay: idx * 0.1, duration: 0.3 }}
            >
              {isEditing ? (
                <>
                  {["ingredient", "quantity", "units", "price"].map((field) => (
                    <td key={field} className="py-2 text-sm text-black">
                      <input
                        type={field === "quantity" ? "number" : "text"}
                        name={field}
                        value={
                          editedItem
                            ? editedItem[field as keyof typeof editedItem]
                            : ""
                        }
                        onChange={handleInputChange}
                        className="lg:w-24 p-1 border border-black ml-6 rounded-lg"
                      />
                    </td>
                  ))}
                  <td className="py-2 text-sm text-black">
                    <button
                      className="mr-2 text-green-600"
                      onClick={() => handleSaveClick(idx)}
                    >
                      <Save size={18} />
                    </button>
                    <button className="text-red-600" onClick={resetEditing}>
                      <X size={18} />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="pl-7 py-3 text-sm text-black">
                    {detail.ingredient}
                  </td>
                  <td className="py-3 text-sm text-black">{detail.quantity}</td>
                  <td className="py-3 text-sm text-black">{detail.units}</td>
                  <td className="py-3 text-sm text-black">{detail.price}</td>
                  <td className="py-3 text-sm text-black">
                    <button
                      className="mr-2 text-[#8B5CF6] hover:text-[#b07ff0]"
                      onClick={() => handleEditClick(idx, detail)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => onItemDelete && onItemDelete(idx)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </>
              )}
            </motion.tr>
          );
        })}
      </tbody>
    </motion.table>
  );
};

export default ReceiptDetails;
