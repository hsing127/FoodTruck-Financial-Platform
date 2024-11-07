import React from "react";

interface ButtonProps {
  onClick: () => void;
  label: string;
  type?: "primary" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  type = "primary",
}) => {
  const baseStyles =
    "text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto";
  const colorStyles =
    type === "primary"
      ? "bg-[#8B5CF6] hover:bg-[#b07ff0]"
      : "bg-red-400 hover:bg-red-500";

  return (
    <button onClick={onClick} className={`${baseStyles} ${colorStyles}`}>
      {label}
    </button>
  );
};

export default Button;
