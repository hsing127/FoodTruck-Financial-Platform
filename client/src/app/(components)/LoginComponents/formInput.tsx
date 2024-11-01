import React from "react";

interface FormInputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
}) => (
  <div className="relative mb-8">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full text-customWhite bg-transparent border-b-2 border-customWhite outline-none py-4 focus:border-[#8B5CF6] transition-all placeholder-customWhite"
    />
  </div>
);

export default FormInput;
