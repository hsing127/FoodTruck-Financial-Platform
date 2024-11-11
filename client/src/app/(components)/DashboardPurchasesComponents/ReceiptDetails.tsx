import React from "react";
import { motion } from "framer-motion";
import { Save, X, Edit, Trash2 } from "lucide-react";
import { ReceiptItem } from "../../types/types";
import TableHeader from "../Common/TableHeader";
import TableRow from "../Common/TableRow";
import EditableCell from "../Common/EditableCell";
import ActionButton from "../Common/ActionButton";
import useEditableItem from "../../hooks/useEditableItem";
import { rowVariants } from "../../utils/animationVariants";

interface ReceiptDetailsProps {
  details: ReceiptItem[];
  onItemEdit?: (index: number, updatedItem: ReceiptItem) => void;
  onItemDelete?: (index: number) => void;
}

const ReceiptDetails: React.FC<ReceiptDetailsProps> = ({
  details,
  onItemEdit,
  onItemDelete,
}) => {
  const {
    editingIndex,
    editedItem,
    handleEditClick,
    handleSaveClick,
    resetEditing,
    handleInputChange,
  } = useEditableItem<ReceiptItem>({ onItemEdit });

  const renderEditingRowCells = (idx: number) =>
    ["ingredient", "quantity", "units", "price"]
      .map((field) => (
        <EditableCell
          key={field}
          type={field === "quantity" ? "number" : "text"}
          name={field}
          value={editedItem ? editedItem[field as keyof ReceiptItem] : ""}
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

  const renderDefaultRowCells = (detail: ReceiptItem, idx: number) => [
    <td key="ingredient" className="py-3 text-sm text-black">
      {detail.ingredient}
    </td>,
    <td key="quantity" className="py-3 text-sm text-black">
      {detail.quantity}
    </td>,
    <td key="units" className="py-3 text-sm text-black">
      {detail.units}
    </td>,
    <td key="price" className="py-3 text-sm text-black">
      {detail.price}
    </td>,
    <td key="actions" className="py-3 text-sm text-black">
      <ActionButton
        icon={<Edit size={18} />}
        onClick={() => handleEditClick(idx, detail)}
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
    <div className="pl-[19%]">
      <motion.table className="min-w-full mt-4 overflow-hidden">
        <TableHeader
          headers={["Ingredient", "Quantity", "Units", "Price", "Actions"]}
        />
        <tbody>
          {details.map((detail, idx) => (
            <TableRow
              key={idx}
              cells={
                editingIndex === idx
                  ? renderEditingRowCells(idx)
                  : renderDefaultRowCells(detail, idx)
              }
              rowIndex={idx}
              variants={rowVariants}
            />
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default ReceiptDetails;
