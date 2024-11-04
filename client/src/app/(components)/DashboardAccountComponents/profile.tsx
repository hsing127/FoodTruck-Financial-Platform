import React, { useState } from "react";
import { User, User2 } from "lucide-react";
import SectionCard from "../DashboardSettingsComponents/sectionCard";
import FormInput from "./forminput";
import Button from "../DashboardSettingsComponents/button";

const Profile: React.FC = () => {
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

  return (
    <SectionCard icon={User} title="Profile Information">
      <div className="flex flex-col items-center mb-4">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
          <User2 className="w-12 h-12 text-gray-600" />
        </div>
        <p className="text-gray-500 text-sm">Image size limit: 125kb max</p>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            name="firstName"
            value={profile.firstName}
            onChange={handleInputChange}
          />
          <FormInput
            label="Last Name"
            name="lastName"
            value={profile.lastName}
            onChange={handleInputChange}
          />
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleInputChange}
          />
          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            value={profile.phone}
            onChange={handleInputChange}
          />
          <FormInput
            label="Birth Date"
            name="birthDate"
            type="date"
            value={profile.birthDate}
            onChange={handleInputChange}
          />
          <FormInput
            label="Company Name"
            name="company"
            value={profile.company}
            onChange={handleInputChange}
          />
        </div>
        <Button
          onClick={() => console.log("Profile saved")}
          label="Save Changes"
        />
      </form>
    </SectionCard>
  );
};

export default Profile;
