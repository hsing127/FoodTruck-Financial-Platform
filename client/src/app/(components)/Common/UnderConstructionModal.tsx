// UnderConstructionModal.tsx
'use client';

import React from 'react';
import { X } from 'lucide-react';

type Scenario = 'notImplemented' | 'inProgress' | 'partial';

interface UnderConstructionModalProps {
  open: boolean;
  onClose: () => void;
  scenario?: Scenario;
}

const SCENARIO_CONTENT = {
  notImplemented: {
    title: 'Feature Not Available Yet',
    message: 'This feature is currently not implemented. Please check back soon!',
    color: 'bg-red-100 text-red-800',
    icon: '🚧',
  },
  inProgress: {
    title: 'Work in Progress',
    message: 'We are actively working on this feature. Hang tight!',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '🛠️',
  },
  partial: {
    title: 'Limited Functionality',
    message: 'This feature is available but currently has limited functionality due to ongoing improvements.',
    color: 'bg-blue-100 text-blue-800',
    icon: '⚙️',
  },
};

export const UnderConstructionModal: React.FC<UnderConstructionModalProps> = ({
  open,
  onClose,
  scenario = 'inProgress',
}) => {
  const { title, message, color, icon } = SCENARIO_CONTENT[scenario];
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className={`rounded-2xl p-6 w-[90%] max-w-md shadow-xl ${color} relative`}>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-700"
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>
        <div className="text-center">
          <div className="text-4xl mb-2">{icon}</div>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};
