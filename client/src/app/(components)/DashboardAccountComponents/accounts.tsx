import React, { useState } from "react";
import { Link2 } from "lucide-react";
import { SiGoogle, SiFacebook, SiYoutube } from "react-icons/si";
import SectionCard from "../DashboardSettingsComponents/sectionCard";
import Button from "../DashboardSettingsComponents/button";

const ConnectedAccounts: React.FC = () => {
  const [isGoogleConnected, setIsGoogleConnected] = useState(true);
  const [isFacebookConnected, setIsFacebookConnected] = useState(false);
  const [isYouTubeConnected, setIsYouTubeConnected] = useState(false);

  const connections = [
    {
      name: "Google",
      icon: <SiGoogle />,
      isConnected: isGoogleConnected,
      toggle: () => setIsGoogleConnected(!isGoogleConnected),
    },
    {
      name: "Facebook",
      icon: <SiFacebook />,
      isConnected: isFacebookConnected,
      toggle: () => setIsFacebookConnected(!isFacebookConnected),
    },
    {
      name: "YouTube",
      icon: <SiYoutube />,
      isConnected: isYouTubeConnected,
      toggle: () => setIsYouTubeConnected(!isYouTubeConnected),
    },
  ];

  return (
    <SectionCard icon={Link2} title="Connected Accounts">
      <div className="text-gray-700">
        <p>Manage your connected accounts</p>
        <div className="mt-4 space-y-4">
          {connections.map(({ name, icon, isConnected, toggle }) => (
            <div key={name} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-2">{icon}</span>
                <span className="font-medium text-black">{name}</span>
              </div>
              <Button
                onClick={toggle}
                label={isConnected ? "Connected" : "Not Connected"}
                type={isConnected ? "primary" : "danger"}
              />
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
};

export default ConnectedAccounts;
