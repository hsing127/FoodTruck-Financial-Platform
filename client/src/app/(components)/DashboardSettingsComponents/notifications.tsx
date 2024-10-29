import React, { useState } from "react";
import { Bell } from "lucide-react";
import SectionCard from "./sectionCard";

const Notifications: React.FC = () => {
  // State for toggles
  const [emailToggle, setEmailToggle] = useState(false);
  const [pushToggle, setPushToggle] = useState(false);
  const [smsToggle, setSmsToggle] = useState(false);

  // Toggle handlers
  const toggleEmail = () => setEmailToggle(!emailToggle);
  const togglePush = () => setPushToggle(!pushToggle);
  const toggleSms = () => setSmsToggle(!smsToggle);

  return (
    <SectionCard icon={Bell} title="Notifications">
      <div className="text-gray-700">
        <div className="space-y-4">
          {/* Email Toggle */}
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <button
              onClick={toggleEmail}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                emailToggle ? "bg-[#8B5CF6]" : "bg-gray-400"
              }`}
            >
              <div
                className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  emailToggle ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>

          {/* Push Toggle */}
          <div className="flex items-center justify-between">
            <span>Push Notifications</span>
            <button
              onClick={togglePush}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                pushToggle ? "bg-[#8B5CF6]" : "bg-gray-400"
              }`}
            >
              <div
                className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  pushToggle ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>

          {/* SMS Toggle */}
          <div className="flex items-center justify-between">
            <span>SMS Notifications</span>
            <button
              onClick={toggleSms}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                smsToggle ? "bg-[#8B5CF6]" : "bg-gray-400"
              }`}
            >
              <div
                className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  smsToggle ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default Notifications;
