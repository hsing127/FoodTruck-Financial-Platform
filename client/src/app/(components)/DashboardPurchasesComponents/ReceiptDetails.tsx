import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Save, X } from "lucide-react";

// Define the type for ReceiptDetails component props
interface ReceiptDetailsProps {
  details: ReceiptItem[];
  onItemEdit?: (index: number, updatedItem: ReceiptItem) => void;
  onItemDelete?: (index: number) => void;
}

interface ReceiptItem {
  ingredient: string;
  quantity: number;
  units: string;
  price: string;
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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<ReceiptItem | null>(null);

  // Toggle edit mode and initialize edited item
  const handleEditClick = (index: number, item: ReceiptItem) => {
    setEditingIndex(index);
    setEditedItem({ ...item });
  };

  // Handle save button click
  const handleSaveClick = (index: number) => {
    if (onItemEdit && editedItem) onItemEdit(index, editedItem);
    resetEditing();
  };

  // Reset editing mode
  const resetEditing = () => {
    setEditingIndex(null);
    setEditedItem(null);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedItem((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  // Render the editing row
  const renderEditingRow = (idx: number) => (
    <>
      {["ingredient", "quantity", "units", "price"].map((field) => (
        <td key={field} className="py-2 text-sm text-black">
          <input
            type={field === "quantity" ? "number" : "text"}
            name={field}
            value={editedItem ? editedItem[field as keyof ReceiptItem] : ""}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
          />
        </td>
      ))}
      <td className="py-2 text-sm text-black">
        <button
          className="pl-2 mr-2 text-green-600"
          onClick={() => handleSaveClick(idx)}
        >
          <Save size={18} />
        </button>
        <button className="text-red-600" onClick={resetEditing}>
          <X size={18} />
        </button>
      </td>
    </>
  );

  // Render the non-editing row
  const renderDefaultRow = (detail: ReceiptItem, idx: number) => (
    <>
      <td className="py-3 text-sm text-black">{detail.ingredient}</td>
      <td className="py-3 text-sm text-black">{detail.quantity}</td>
      <td className="py-3 text-sm text-black">{detail.units}</td>
      <td className="py-3 text-sm text-black">{detail.price}</td>
      <td className="py-3 text-sm text-black">
        <button
          className="pl-2 mr-2 text-[#8B5CF6] hover:text-[#b07ff0]"
          onClick={() => handleEditClick(idx, detail)}
        >
          <Edit size={18} />
        </button>
        <button
          className="text-red-400 hover:text-red-500"
          onClick={() => onItemDelete && onItemDelete(idx)}
        >
          <Trash2 size={18} />
        </button>
      </td>
    </>
  );

  return (
    <div className="pl-[19%]">
      <motion.table className="min-w-full mt-4 overflow-hidden">
        <thead>
          <tr>
            {["Ingredient", "Quantity", "Units", "Price", "Actions"].map(
              (header) => (
                <th
                  key={header}
                  className="w-1/4 text-left text-xs font-medium text-black uppercase tracking-wider"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {details.map((detail, idx) => (
            <motion.tr
              key={idx}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: idx * 0.1, duration: 0.3 }}
            >
              {editingIndex === idx
                ? renderEditingRow(idx)
                : renderDefaultRow(detail, idx)}
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default ReceiptDetails;
