import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import SectionCard from "./sectionCard";
import ConfirmModal from "../DashboardSettingsComponents/confirmModal";
import Button from "../DashboardSettingsComponents/button";

const DeleteAccount: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => setIsModalOpen(true);
  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    console.log("Account deleted");
  };
  const handleCancelDelete = () => setIsModalOpen(false);

  return (
    <SectionCard icon={Trash2} title="Delete Account">
      <div className="text-gray-700">
        <p className="mb-4">
          Permanently delete your account. This action cannot be undone.
        </p>
        <Button
          onClick={handleDeleteClick}
          label="Delete Account"
          type="danger"
        />
        <ConfirmModal
          isOpen={isModalOpen}
          title="Confirm Deletion"
          message="Are you sure you want to delete your account? This action cannot be undone."
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </div>
    </SectionCard>
  );
};

export default DeleteAccount;
