import React from "react";
import ReactDOM from "react-dom";
import Button from "../DashboardSettingsComponents/button";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
      <div className="bg-gray-50 text-black p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-6 text-black">{message}</p>
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
