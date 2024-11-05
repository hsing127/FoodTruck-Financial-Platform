import React, { useState } from "react";
import { Bell } from "lucide-react";
import SectionCard from "./sectionCard";
import SettingsSection from "../DashboardSettingsComponents/settingsSection";

const Notifications: React.FC = () => {
  const [emailToggle, setEmailToggle] = useState(false);
  const [pushToggle, setPushToggle] = useState(false);
  const [smsToggle, setSmsToggle] = useState(false);

  const settings = [
    {
      label: "Email Notifications",
      isEnabled: emailToggle,
      onToggle: () => setEmailToggle(!emailToggle),
    },
    {
      label: "Push Notifications",
      isEnabled: pushToggle,
      onToggle: () => setPushToggle(!pushToggle),
    },
    {
      label: "SMS Notifications",
      isEnabled: smsToggle,
      onToggle: () => setSmsToggle(!smsToggle),
    },
  ];

  return (
    <SectionCard icon={Bell} title="Notifications">
      <SettingsSection title="Notification Settings" settings={settings} />
    </SectionCard>
  );
};

export default Notifications;
