import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import FormInput from "./forminput";
import SectionCard from "../DashboardSettingsComponents/sectionCard";
import Button from "../DashboardSettingsComponents/button";

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
        <FormInput
          label="Current Password"
          type="password"
          name="currentPassword"
          value={passwords.currentPassword}
          onChange={handleInputChange}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="New Password"
            type={passwords.newPasswordVisible ? "text" : "password"}
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleInputChange}
          />
          <span
            onClick={() => toggleVisibility("newPasswordVisible")}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
          >
            {passwords.newPasswordVisible ? <EyeOff /> : <Eye />}
          </span>
          <FormInput
            label="Confirm New Password"
            type={passwords.confirmPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleInputChange}
          />
          <span
            onClick={() => toggleVisibility("confirmPasswordVisible")}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
          >
            {passwords.confirmPasswordVisible ? <EyeOff /> : <Eye />}
          </span>
        </div>
        <Button
          onClick={() => console.log("Password updated")}
          label="Update Password"
        />
      </form>
    </SectionCard>
  );
};

export default ChangePassword;
