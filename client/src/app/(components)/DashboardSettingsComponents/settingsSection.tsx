import React from "react";
import ToggleSwitch from "../DashboardSettingsComponents/toggleSwitch";

interface Setting {
  label: string;
  isEnabled: boolean;
  onToggle: () => void;
}

interface SettingsSectionProps {
  title?: string;
  settings: Setting[];
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, settings }) => (
  <div className="text-gray-700">
    {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>} {/* Render title only if provided */}
    {settings.map(({ label, isEnabled, onToggle }) => (
      <div key={label} className="flex items-center justify-between mb-4">
        <span>{label}</span>
        <ToggleSwitch isEnabled={isEnabled} onToggle={onToggle} />
      </div>
    ))}
  </div>
);

export default SettingsSection;
