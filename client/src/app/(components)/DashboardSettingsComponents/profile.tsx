import React from "react";
import { User, User2 } from "lucide-react";
import SectionCard from "./sectionCard";

const Profile: React.FC = () => {
  return (
    <SectionCard icon={User} title="Profile">
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <div className="w-20 h-20 mr-4 rounded-full bg-gray-200 flex items-center justify-center">
          <User2 className="w-12 h-12 text-gray-600" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
          <p className="text-gray-600">john.doe@example.com</p>
        </div>
      </div>

      <button className="bg-[#8B5CF6] hover:bg-[#b07ff0] text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto">
        Edit Profile
      </button>
    </SectionCard>
  );
};

export default Profile;
