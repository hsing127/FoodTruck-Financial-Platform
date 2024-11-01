import React, { useState } from "react";
import { Lock } from "lucide-react";
import SectionCard from "../DashboardSettingsComponents/sectionCard";

const ChangePassword: React.FC = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({ ...prevPasswords, [name]: value }));
  };

  return (
    <SectionCard icon={Lock} title="Change Password">
      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleInputChange}
            className="border p-2 rounded-md bg-white text-black"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleInputChange}
            className="border p-2 rounded-md bg-white text-black"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleInputChange}
            className="border p-2 rounded-md bg-white text-black"
          />
        </div>

        <button
          type="button"
          className="bg-[#8B5CF6] hover:bg-[#b07ff0] text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
        >
          Update Password
        </button>
      </form>
    </SectionCard>
  );
};

export default ChangePassword;
