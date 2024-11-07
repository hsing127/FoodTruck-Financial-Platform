import React from "react";
import { Edit, Save, Trash2, X } from "lucide-react";

interface InventoryTableRowProps {
  inventory: any;
  editingInventoryName: string;
  handleEditClick: (inventory: any) => void;
  handleSaveClick: () => void;
  handleCancelClick: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editedInventory: any;
  handleDeleteClick: (inventoryName: string) => void;
}

const InventoryTableRow: React.FC<InventoryTableRowProps> = ({
  inventory,
  editingInventoryName,
  handleEditClick,
  handleSaveClick,
  handleCancelClick,
  handleInputChange,
  editedInventory,
  handleDeleteClick,
}) => {
  // Prevent event propagation
  const preventEventPropagation = (e: React.MouseEvent) => e.stopPropagation();

  // Common function for rendering input fields
  const renderInputField = (name: string, value: string) => (
    <td className="py-2 text-sm text-black">
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleInputChange}
        className="lg:w-24 p-1 border border-white"
        onClick={preventEventPropagation}
      />
    </td>
  );

  return (
    <tr>
      <td className="py-5 text-sm font-medium text-black">{inventory.Name}</td>

      {editingInventoryName === inventory.Name ? (
        <>
          {["Amount", "AmountUnits"].map((field) =>
            renderInputField(field, editedInventory[field])
          )}
          <td className="py-2 text-sm text-black">
            <button
              className="mr-2 text-green-600"
              onClick={(e) => {
                preventEventPropagation(e);
                handleSaveClick();
              }}
            >
              <Save size={18} />
            </button>
            <button
              className="text-red-600"
              onClick={(e) => {
                preventEventPropagation(e);
                handleCancelClick();
              }}
            >
              <X size={18} />
            </button>
          </td>
        </>
      ) : (
        <>
          {["Amount", "AmountUnits"].map((field) => (
            <td key={field} className="py-2 text-sm text-black">
              {inventory[field]}
            </td>
          ))}
          <td className="py-2 text-sm text-black">
            <button
              className="mr-2 text-[#8B5CF6] hover:text-[#b07ff0]"
              onClick={(e) => {
                preventEventPropagation(e);
                handleEditClick(inventory);
              }}
            >
              <Edit size={18} />
            </button>
            <button
              className="text-red-400 hover:text-red-500"
              onClick={(e) => {
                preventEventPropagation(e);
                handleDeleteClick(inventory.Name);
              }}
            >
              <Trash2 size={18} />
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default InventoryTableRow;
