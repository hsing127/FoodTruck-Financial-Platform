import React, { useState } from "react";
import { Lock } from "lucide-react";
import SectionCard from "./sectionCard";
import SettingsSection from "../DashboardSettingsComponents/settingsSection";
import Button from "../DashboardSettingsComponents/button";

const Security: React.FC = () => {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [isAutoLogoutEnabled, setIsAutoLogoutEnabled] = useState(false);
  const [trustedDevices, setTrustedDevices] = useState([
    { id: 1, name: "Chrome on Windows", location: "New York, USA" },
    { id: 2, name: "Safari on iPhone", location: "San Francisco, USA" },
  ]);

  const settings = [
    {
      label: "Enable Two-Factor Authentication",
      isEnabled: isTwoFactorEnabled,
      onToggle: () => setIsTwoFactorEnabled(!isTwoFactorEnabled),
    }
  ];

  const removeTrustedDevice = (deviceId: number) => {
    setTrustedDevices(trustedDevices.filter((device) => device.id !== deviceId));
  };

  return (
    <SectionCard icon={Lock} title="Security">
      <SettingsSection settings={settings} />

      {isAutoLogoutEnabled && (
        <p className="text-sm text-gray-600 mt-2">
          You will be logged out automatically after a period of inactivity.
        </p>
      )}

      {/* Trusted Devices Section */}
      <div className="mt-2">
        <h3 className="font-medium text-gray-700">Trusted Devices</h3>
        <ul className="mt-2 text-sm space-y-2">
          {trustedDevices.map((device) => (
            <li key={device.id} className="flex justify-between items-center">
              <span>
                {device.name} - {device.location}
              </span>
              <Button
                onClick={() => removeTrustedDevice(device.id)}
                label="Remove"
                type="danger"
              />
            </li>
          ))}
        </ul>
      </div>
    </SectionCard>
  );
};

export default Security;
