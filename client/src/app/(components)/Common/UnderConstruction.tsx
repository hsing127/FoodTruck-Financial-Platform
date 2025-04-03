'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

type Scenario = 'notImplemented' | 'inProgress' | 'partial';

interface ScenarioContent {
  title: string;
  message: string;
  color: string;
  icon: string;
}

interface ButtonProps {
  scenario?: Scenario;
  label?: string;
  className?: string;
}

const SCENARIO_CONTENT: Record<Scenario, ScenarioContent> = {
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

export const UnderConstructionButton: React.FC<ButtonProps> = ({
  scenario = 'inProgress',
  label = 'Click Me',
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const { title, message, color, icon } = SCENARIO_CONTENT[scenario];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 ${className}`}
      >
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className={`rounded-2xl p-6 w-[90%] max-w-md shadow-xl ${color} relative`}>
            <button
              onClick={() => setOpen(false)}
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
      )}
    </>
  );
};
