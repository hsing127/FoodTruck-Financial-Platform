import React, { useState } from "react";
import { Lock } from "lucide-react";
import SectionCard from "./sectionCard";

const Security: React.FC = () => {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  // Toggle handler for two-factor authentication
  const toggleTwoFactor = () => setIsTwoFactorEnabled(!isTwoFactorEnabled);

  return (
    <SectionCard icon={Lock} title="Security">
      <div className="text-gray-700">
        {/* Toggle for Two-Factor Authentication */}
        <div className="flex items-center justify-between">
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

        {/* Change Password Button */}
        <button className="bg-[#8B5CF6] hover:bg-[#b07ff0] text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto mt-4">
          Change Password
        </button>
      </div>
    </SectionCard>
  );
};

export default Security;
