import React from "react";

interface EditableCellProps {
  isEditing: boolean;
  value: string | number;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  placeholder?: string;
}

const EditableCell: React.FC<EditableCellProps> = ({
  isEditing,
  value,
  name,
  onChange,
  type = "text",
  className = "",
  placeholder,
}) => (
  <td className={name ==='menuItem'? 'pl-8 py-2 text-sm text-black ${className}':`py-2 text-sm text-black ${className}`}>
    {isEditing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onClick={(e) => e.stopPropagation()} // Prevents row toggle
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
        placeholder={placeholder}
      />
    ) : (
      value
    )}
  </td>
);

export default EditableCell;
