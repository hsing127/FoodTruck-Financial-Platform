import React from "react";

interface EditableCellProps {
  type: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  type,
  name,
  value,
  onChange,
}) => (
  <td className="py-2 text-sm text-black">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
    />
  </td>
);

export default EditableCell;
