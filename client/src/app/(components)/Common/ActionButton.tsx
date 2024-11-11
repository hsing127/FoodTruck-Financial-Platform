import React from "react";

interface ActionButtonProps {
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  onClick,
  className,
}) => (
  <button className={className} onClick={onClick}>
    {icon}
  </button>
);

export default ActionButton;
