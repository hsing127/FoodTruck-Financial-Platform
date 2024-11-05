import React from "react";

interface FormInputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
}) => (
  <div className="flex flex-col">
    <label className="text-gray-700 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border p-2 rounded-md bg-white text-black border-gray-400"
    />
  </div>
);

export default FormInput;
