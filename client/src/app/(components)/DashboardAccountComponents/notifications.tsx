import React, { useState } from "react";
import { Bell } from "lucide-react";
import SectionCard from "../DashboardSettingsComponents/sectionCard";

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  const toggleNotification = (type: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <SectionCard icon={Bell} title="Notifications Settings">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Email Notifications</span>
          <button
            onClick={() => toggleNotification("emailNotifications")}
            className={`px-4 py-2 font-bold rounded ${
              notifications.emailNotifications
                ? "bg-[#8B5CF6] text-white"
                : "bg-gray-400 text-gray-800"
            }`}
          >
            {notifications.emailNotifications ? "Enabled" : "Disabled"}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">SMS Notifications</span>
          <button
            onClick={() => toggleNotification("smsNotifications")}
            className={`px-4 py-2 font-bold rounded ${
              notifications.smsNotifications
                ? "bg-[#8B5CF6] text-white"
                : "bg-gray-400 text-gray-800"
            }`}
          >
            {notifications.smsNotifications ? "Enabled" : "Disabled"}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Push Notifications</span>
          <button
            onClick={() => toggleNotification("pushNotifications")}
            className={`px-4 py-2 font-bold rounded ${
              notifications.pushNotifications
                ? "bg-[#8B5CF6] text-white"
                : "bg-gray-400 text-gray-800"
            }`}
          >
            {notifications.pushNotifications ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>
    </SectionCard>
  );
};

export default Notifications;
