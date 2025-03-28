import React from "react";
import { Edit, Save, Trash2, X, Plus } from "lucide-react"; 

interface ActionButtonsProps {
  isEditing: boolean;
  onEdit: (e: React.MouseEvent) => void;
  onSave: (e: React.MouseEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  onAdd?: (e: React.MouseEvent) => void; 
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onAdd,
}) => (
  <td className="pl-2 py-4 text-sm text-black">
    <div className="flex items-center space-x-2">
      {isEditing ? (
        <>
          <button
            className="text-green-500 hover:text-green-600"
            onClick={(e) => {
              e.stopPropagation();
              onSave(e);
            }}
          >
            <Save size={18} />
          </button>
          <button
            className="text-red-500 hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              onCancel(e);
            }}
          >
            <X size={18} />
          </button>
        </>
      ) : (
        <>
          {/* Plus Button */}
          {onAdd && (
            <button
              className="text-green-500 hover:text-green-600"
              onClick={(e) => {
                e.stopPropagation();
                onAdd(e);
              }}
            >
              <Plus size={18} />
            </button>
          )}

          {/* Edit Button */}
          <button
            className="text-[#8B5CF6] hover:text-[#b07ff0]"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(e);
            }}
          >
            <Edit size={18} />
          </button>

          {/* Delete Button */}
          <button
            className="text-red-400 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(e);
            }}
          >
            <Trash2 size={18} />
          </button>
        </>
      )}
    </div>
  </td>
);

export default ActionButtons;
