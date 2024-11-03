import React, { useState } from "react";
import { Lock } from "lucide-react";
import SectionCard from "./sectionCard";

const Security: React.FC = () => {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [isSuspiciousActivityEnabled, setIsSuspiciousActivityEnabled] =
    useState(false);
  const [isAutoLogoutEnabled, setIsAutoLogoutEnabled] = useState(false);
  const [trustedDevices, setTrustedDevices] = useState([
    { id: 1, name: "Chrome on Windows", location: "New York, USA" },
    { id: 2, name: "Safari on iPhone", location: "San Francisco, USA" },
  ]);

  // Toggle handlers
  const toggleTwoFactor = () => setIsTwoFactorEnabled(!isTwoFactorEnabled);
  const toggleSuspiciousActivity = () =>
    setIsSuspiciousActivityEnabled(!isSuspiciousActivityEnabled);
  const toggleAutoLogout = () => setIsAutoLogoutEnabled(!isAutoLogoutEnabled);

  // Remove trusted device
  const removeTrustedDevice = (deviceId: number) => {
    setTrustedDevices(
      trustedDevices.filter((device) => device.id !== deviceId)
    );
  };

  return (
    <SectionCard icon={Lock} title="Security">
      <div className="text-gray-700">
        {/* Toggle for Two-Factor Authentication */}
        <div className="flex items-center justify-between mb-4">
          <span>Enable Two-Factor Authentication</span>
          <button
            onClick={toggleTwoFactor}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              isTwoFactorEnabled ? "bg-[#8B5CF6]" : "bg-gray-400"
            }`}
          >
            <div
              className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                isTwoFactorEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>

        {/* Toggle for Automatic Logout on Inactivity */}
        <div className="flex items-center justify-between mt-4">
          <span>Enable automatic logout on inactivity</span>
          <button
            onClick={toggleAutoLogout}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              isAutoLogoutEnabled ? "bg-[#8B5CF6]" : "bg-gray-400"
            }`}
          >
            <div
              className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                isAutoLogoutEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>
        {isAutoLogoutEnabled && (
          <p className="text-sm text-gray-600 mt-2">
            You will be logged out automatically after a period of inactivity.
          </p>
        )}

        {/* Trusted Devices Section */}
        <div className="mt-4">
          <h3 className="font-medium text-gray-700">Trusted Devices</h3>
          <ul className="mt-2 text-sm space-y-1">
            {trustedDevices.map((device) => (
              <li key={device.id} className="flex justify-between items-center">
                <span>
                  {device.name} - {device.location}
                </span>
                <button
                  onClick={() => removeTrustedDevice(device.id)}
                  className="text-[#8B5CF6] hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
};

export default Security;
