"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import ReactDOM from "react-dom";
import { Notification } from "@/app/types/types";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

// Animation variants for backdrop and modal
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

const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
}) => {
  // Ensure the portal root exists
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let root = document.getElementById("portal-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "portal-root";
      document.body.appendChild(root);
    }
    setPortalRoot(root);
  }, []);

  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="left-[130px] bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative border border-gray-200 z-60 max-h-[80vh] flex flex-col overflow-y-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close Notifications"
            >
              <X size={24} />
            </button>

            {/* Modal Title */}
            <h2 className="text-xl font-semibold mb-4 text-gray-800 ">
              Notifications
            </h2>

            {/* Notifications List */}
            <div className="flex-grow space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-3 bg-gray-100 bg-opacity-25 rounded-lg shadow-sm"
                >
                  <h3 className="font-medium text-gray-800 ">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {notification.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                onClose();
              }}
              className="mt-4 w-full py-2 bg-[#8B5CF6] hover:bg-[#b07ff0] text-white rounded-lg"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalRoot
  );
};

export default NotificationsModal;
