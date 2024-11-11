import React from "react";
import { Edit, Save, Trash2, X } from "lucide-react";
import ActionButton from "../Common/ActionButton";
import EditableCell from "../Common/EditableCell";
import useEditableItem from "../../hooks/useEditableItem";
import { InventoryItem } from "../../types/types";

interface InventoryTableRowProps {
  inventory: InventoryItem;
  index: number;
  onItemEdit: (index: number, updatedItem: InventoryItem) => void;
  onItemDelete: (index: number) => void;
}

const InventoryTableRow: React.FC<InventoryTableRowProps> = ({
  inventory,
  index,
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
  } = useEditableItem<InventoryItem>({ onItemEdit });

  const isEditing = editingIndex === index;

  return (
    <tr>
      <td className="py-5 text-sm font-medium text-black">{inventory.Name}</td>

      {isEditing ? (
        <>
          <EditableCell
            type="text"
            name="Amount"
            value={editedItem ? editedItem.Amount : ""}
            onChange={handleInputChange}
          />
          <EditableCell
            type="text"
            name="AmountUnits"
            value={editedItem ? editedItem.AmountUnits : ""}
            onChange={handleInputChange}
          />
          <td className="py-2 text-sm text-black">
            <ActionButton
              icon={<Save size={18} />}
              onClick={() => handleSaveClick(index)}
              className="mr-2 text-green-600"
            />
            <ActionButton
              icon={<X size={18} />}
              onClick={resetEditing}
              className="text-red-600"
            />
          </td>
        </>
      ) : (
        <>
          <td className="py-2 text-sm text-black">{inventory.Amount}</td>
          <td className="py-2 text-sm text-black">{inventory.AmountUnits}</td>
          <td className="py-2 text-sm text-black">
            <ActionButton
              icon={<Edit size={18} />}
              onClick={() => handleEditClick(index, inventory)}
              className="mr-2 text-[#8B5CF6] hover:text-[#b07ff0]"
            />
            <ActionButton
              icon={<Trash2 size={18} />}
              onClick={() => onItemDelete(index)}
              className="text-red-400 hover:text-red-500"
            />
          </td>
        </>
      )}
    </tr>
  );
};

export default InventoryTableRow;
