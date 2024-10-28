import React from "react";

interface SubmitButtonProps {
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => (
  <button
    type="submit"
    className="w-full bg-[#8B5CF6] text-customWhite font-bold py-4 rounded-full transition-all hover:bg-[#7B49E2]"
  >
    {text}
  </button>
);

export default SubmitButton;
