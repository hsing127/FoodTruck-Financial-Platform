import React from "react";
import { Edit, Save, Trash2, X } from "lucide-react";

interface ActionButtonsProps {
  isEditing: boolean;
  onEdit: (e: React.MouseEvent) => void;
  onSave: (e: React.MouseEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) => (
  <td className="pl-2 py-4 text-sm text-black">
    {isEditing ? (
      <>
        <button
          className="mr-2 text-green-500 hover:text-green-600"
          onClick={(e) => {
            e.stopPropagation(); // Prevents row toggle
            onSave(e);
          }}
        >
          <Save size={18} />
        </button>
        <button
          className="text-red-500 hover:text-red-600"
          onClick={(e) => {
            e.stopPropagation(); // Prevents row toggle
            onCancel(e);
          }}
        >
          <X size={18} />
        </button>
      </>
    ) : (
      <>
        <button
          className="mr-2 text-[#8B5CF6] hover:text-[#b07ff0]"
          onClick={(e) => {
            e.stopPropagation(); // Prevents row toggle
            onEdit(e);
          }}
        >
          <Edit size={18} />
        </button>
        <button
          className="text-red-400 hover:text-red-500"
          onClick={(e) => {
            e.stopPropagation(); // Prevents row toggle
            onDelete(e);
          }}
        >
          <Trash2 size={18} />
        </button>
      </>
    )}
  </td>
);

export default ActionButtons;
