import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, User2, User } from "lucide-react";
import SectionCard from "../DashboardSettingsComponents/sectionCard";
import FormInput from "../DashboardSettingsComponents/forminput";
import Button from "../DashboardSettingsComponents/button";
import Image from "next/image";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    province: string;
    company: string;
  };
    onProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } },
};

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onProfileChange,
  onSave,
}) => {
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Form submission prevented");
    e.preventDefault();  
    onSave();
  };
    
  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50 overflow-hidden"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg w-[90%] max-w-6xl max-h-screen overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto max-h-[90vh] p-6">
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold text-black">
                  Edit Profile
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center relative mb-4 overflow-hidden">
                  {avatar ? (
                    <Image
                      src={URL.createObjectURL(avatar)}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User2 className="w-12 h-12 text-gray-600" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-gray-500 text-sm mb-2 hidden"
                />
                <p className="text-gray-500 text-sm">
                  Image size limit: 125kb max
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                    label="First Name"
                    name="firstName"
                    value={profile.firstName}
                    onChange={onProfileChange}
                    />
                    <FormInput
                    label="Last Name"
                    name="lastName"
                    value={profile.lastName}
                    onChange={onProfileChange}
                    />
                    <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={onProfileChange}
                    />
                    <FormInput
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={onProfileChange}
                    />
                    <div>
                    <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                        Province
                    </label>
                    <input
                        id="province"
                        name="province"
                        type="text"
                        value={profile.province}
                        onChange={onProfileChange}
                        list="province-options"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                    />
                    <datalist id="province-options">
                        <option value="Alberta" />
                        <option value="British Columbia" />
                        <option value="Manitoba" />
                        <option value="New Brunswick" />
                        <option value="Newfoundland and Labrador" />
                        <option value="Nova Scotia" />
                        <option value="Ontario" />
                        <option value="Prince Edward Island" />
                        <option value="Quebec" />
                        <option value="Northwest Territories" />
                        <option value="Nunavut" />
                        <option value="Yukon" />
                        <option value="Saskatchewan" />
                    </datalist>
                    </div>

                    <FormInput
                    label="Company Name"
                    name="company"
                    value={profile.company}
                    onChange={onProfileChange}
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <Button type="button" onClick={onClose} label="Cancel" />
                   <Button type="button" onClick={() => handleFormSubmit} label="Save Changes" />
                </div>
                </form>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProfileModal;
