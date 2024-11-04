import React from "react";

interface ToggleSwitchProps {
  isEnabled: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isEnabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
      isEnabled ? "bg-[#8B5CF6]" : "bg-gray-400"
    }`}
  >
    <div
      className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
        isEnabled ? "translate-x-6" : "translate-x-0"
      }`}
    ></div>
  </button>
);

export default ToggleSwitch;
