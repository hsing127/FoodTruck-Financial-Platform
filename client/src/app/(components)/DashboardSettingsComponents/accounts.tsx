import React, { useState } from "react";
import { Link2 } from "lucide-react";
import { SiGoogle, SiFacebook, SiX, SiYoutube } from "react-icons/si";
import SectionCard from "./sectionCard";

const ConnectedAccounts: React.FC = () => {
  const [isGoogleConnected, setIsGoogleConnected] = useState(true);
  const [isFacebookConnected, setIsFacebookConnected] = useState(false);
  const [isTwitterConnected, setIsTwitterConnected] = useState(true);
  const [isYouTubeConnected, setIsYouTubeConnected] = useState(false);

  return (
    <SectionCard icon={Link2} title="Connected Accounts">
      <div className="text-gray-700">
        <p>Manage your connected accounts</p>

        <div className="mt-4 space-y-4">
          {/* Google Account Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <SiGoogle className="w-6 h-6 mr-2 " />
              <span className="font-medium text-black">Google</span>
            </div>
            <button
              onClick={() => setIsGoogleConnected(!isGoogleConnected)}
              className={`${
                isGoogleConnected
                  ? "bg-[#8B5CF6] hover:bg-purple-700"
                  : "bg-gray-400 hover:bg-gray-500"
              } text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto`}
            >
              {isGoogleConnected ? "Connected" : "Not Connected"}
            </button>
          </div>

          {/* Facebook Account Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <SiFacebook className="w-6 h-6 mr-2 " />
              <span className="font-medium text-black">Facebook</span>
            </div>
            <button
              onClick={() => setIsFacebookConnected(!isFacebookConnected)}
              className={`${
                isFacebookConnected
                  ? "bg-[#8B5CF6] hover:bg-purple-700"
                  : "bg-gray-400 hover:bg-gray-500"
              } text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto`}
            >
              {isFacebookConnected ? "Connected" : "Not Connected"}
            </button>
          </div>

          {/* Twitter (X) Account Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <SiX className="w-6 h-6 mr-2 " />
              <span className="font-medium text-black">Twitter (X)</span>
            </div>
            <button
              onClick={() => setIsTwitterConnected(!isTwitterConnected)}
              className={`${
                isTwitterConnected
                  ? "bg-[#8B5CF6] hover:bg-purple-700"
                  : "bg-gray-400 hover:bg-gray-500"
              } text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto`}
            >
              {isTwitterConnected ? "Connected" : "Not Connected"}
            </button>
          </div>

          {/* YouTube Account Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <SiYoutube className="w-6 h-6 mr-2 " />
              <span className="font-medium text-black">YouTube</span>
            </div>
            <button
              onClick={() => setIsYouTubeConnected(!isYouTubeConnected)}
              className={`${
                isYouTubeConnected
                  ? "bg-[#8B5CF6] hover:bg-purple-700"
                  : "bg-gray-400 hover:bg-gray-500"
              } text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto`}
            >
              {isYouTubeConnected ? "Connected" : "Not Connected"}
            </button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default ConnectedAccounts;
