import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import SectionCard from "../DashboardSettingsComponents/sectionCard";

const ChangePassword: React.FC = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordVisible: false,
    confirmPassword: "",
    confirmPasswordVisible: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({ ...prevPasswords, [name]: value }));
  };

  const toggleVisibility = (
    field: "newPasswordVisible" | "confirmPasswordVisible"
  ) => {
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [field]: !prevPasswords[field],
    }));
  };

  return (
    <SectionCard icon={Lock} title="Change Password">
      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Current Password</label>
          <div className="relative">
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleInputChange}
              className="focus:border-opacity-50 border border-gray-400 p-2 rounded-md bg-white text-black w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* New Password */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">New Password</label>
            <div className="relative">
              <input
                type={passwords.newPasswordVisible ? "text" : "password"}
                name="newPassword"
                value={passwords.newPassword}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded-md bg-white text-black w-full"
              />
              <span
                onClick={() => toggleVisibility("newPasswordVisible")}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
              >
                {passwords.newPasswordVisible ? <EyeOff /> : <Eye />}
              </span>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={passwords.confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded-md bg-white text-black w-full"
              />
              <span
                onClick={() => toggleVisibility("confirmPasswordVisible")}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
              >
                {passwords.confirmPasswordVisible ? <EyeOff /> : <Eye />}
              </span>
            </div>
          </div>
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
