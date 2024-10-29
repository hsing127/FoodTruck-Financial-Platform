import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import SectionCard from "./sectionCard";
import ConfirmModal from "./confirmModal";

const DeleteAccount: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    console.log("Account deleted");
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <SectionCard icon={Trash2} title="Delete Account">
      <div className="text-gray-700">
        <p className="mb-4">
          Permanently delete your account. This action cannot be undone.
        </p>
        <button
          onClick={handleDeleteClick}
          className="bg-red-400 hover:bg-red-300 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
        >
          Delete Account
        </button>
        <ConfirmModal
          isOpen={isModalOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </div>
    </SectionCard>
  );
};

export default DeleteAccount;
