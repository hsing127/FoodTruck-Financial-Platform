import React from "react";

interface SelectInputProps {
  label: string;
  options: string[];
}

const SelectInput: React.FC<SelectInputProps> = ({ label, options }) => (
  <div className="flex items-center justify-between p-1">
    <span className="font-medium text-black">{label}</span>
    <select className="max-w-[200px] border border-gray-300 rounded-lg p-2 w-full sm:w-1/2 bg-white text-black">
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default SelectInput;
