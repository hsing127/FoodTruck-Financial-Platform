import React, { useState } from "react";
import { User, User2 } from "lucide-react";
import SectionCard from "../DashboardSettingsComponents/sectionCard";
import ProfileModal from "../DashboardSettingsComponents/profileModal";

const Profile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+123456789",
    birthDate: "1990-01-01",
    company: "company.ltd",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <SectionCard icon={User} title="Profile Information">
      <div className="flex flex-col items-center mb-4">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
          <User2 className="w-12 h-12 text-gray-600" />
        </div>
        <p className="text-gray-500 text-sm">Image size limit: 125kb max</p>
      </div>

      <button
        onClick={openModal}
        className="bg-[#8B5CF6] hover:bg-[#b07ff0] text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
      >
        Edit Profile
      </button>

      <ProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        profile={profile}
        onProfileChange={handleInputChange}
      />
    </SectionCard>
  );
};

export default Profile;
