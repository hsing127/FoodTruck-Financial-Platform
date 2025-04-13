'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

type Scenario = 'notImplemented' | 'inProgress' | 'partial';

/**
 * UnderConstructionModal
 *
 * This is a reusable modal for alerting users that a feature is not yet implemented,
 * is in progress, or has limited functionality.
 *
 * To use this modal in a component:
 *
 * 1. Import the modal:
 *    import { UnderConstructionModal } from "../Common/UnderConstructionModal";
 *
 * 2. Add local state:
 *    const [isModalOpen, setIsModalOpen] = useState(false);
 *
 * 3. Trigger the modal (ex: on button click):
 *    <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
 *
 * 4. Render the modal - See message below to check which scenario fits best:
 *    <UnderConstructionModal
 *      open={isModalOpen}
 *      onClose={() => setIsModalOpen(false)}
 *      scenario="partial" // or "inProgress" | "notImplemented"
 *    />
 */


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

  // ESC key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!open) return null;

  return (
    // Backdrop: Prevents clicks behind + disables interaction
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
      {/* Modal Box */}
      <div
        className={`relative rounded-2xl p-6 w-[90%] max-w-md shadow-xl ${color} pointer-events-auto`}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-700 hover:text-black"
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="text-4xl mb-2">{icon}</div>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};
