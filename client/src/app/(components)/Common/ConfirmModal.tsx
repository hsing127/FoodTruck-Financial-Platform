// src/components/Common/ConfirmModal.tsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "../DashboardSettingsComponents/button";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  proTip?: string; // Optional prop for the pro tip
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  proTip,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const handleBackdropClick = () => {
    onCancel();
  };

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-gray-100 bg-opacity-30 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-sm"
        onClick={handleModalClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <h2 id="confirm-modal-title" className="text-lg font-semibold mb-4">
          {title}
        </h2>
        <p className="mb-4">{message}</p>
        {proTip && (
          <p className="text-sm text-gray-500 italic mb-4">{proTip}</p>
        )}
        <div className="flex justify-end gap-4">
          <Button onClick={onCancel} label="Cancel" />
          <Button onClick={onConfirm} label="Delete" type="danger" />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
