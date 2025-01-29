import React, { useState, useEffect } from "react";
import { User, User2 } from "lucide-react";
import SectionCard from "../DashboardSettingsComponents/sectionCard";
import ProfileModal from "../DashboardSettingsComponents/profileModal";

const Profile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "",
    phone: "+1 (480) 567 8910",
    province: "",
    company: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/profile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: "ajwitt2@asu.edu" }),
          }
        );

        const data = await response.json();
        if (response.ok && data.body) {
          setProfile((prev) => ({
            ...prev,
            email: data.body.Email || prev.email,
            company: data.body.BusinessName || prev.company,
            province: data.body.province || prev.province,
          }));
        } else {
          console.error("Failed to fetch profile:", data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onSave = async () => {
    console.log("Profile saving")
      try {
      const response = await fetch(
        "https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/data/editTable",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            table: "user",
            body: {
              Email: profile.email,
              NewProvince: profile.province,
              NewBusinessName: profile.company,
            },
          }),
        }
      );
      if (response.ok) {
        console.log("Profile saved successfully");
      } else {
        console.error("Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      }
      console.log("Profile saved")
  };

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
        onSave={onSave}  // Passing the onSave function as prop
      />
    </SectionCard>
  );
};

export default Profile;
