import React from "react";

interface AddManualEntryModalProps {
  onClose: () => void;
}

const AddManualEntryModal: React.FC<AddManualEntryModalProps> = ({
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white p-6 rounded-lg z-10">
        <h2 className="text-xl font-semibold mb-4">Add Manual Entry</h2>
        <p>This is where your form or content goes.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddManualEntryModal;
