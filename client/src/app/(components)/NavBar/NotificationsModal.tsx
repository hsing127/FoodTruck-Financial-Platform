"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import {
  backdropVariants,
  fadeInDownVariants,
  fadeInUpVariants,
  hoverVariants,
  modalVariants,
} from "../Common/Animations";

interface Notification {
  id: number;
  title: string;
  description: string;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

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
            {/* Modal title */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Notifications
            </h2>

            {/* Notifications List */}
            <motion.div
              className="flex-grow space-y-3"
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  className="p-3 bg-gray-100 bg-opacity-25 rounded-lg shadow-sm"
                  variants={fadeInUpVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                >
                  <h3 className="font-medium text-gray-800 ">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {notification.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="mt-4 w-full py-2 bg-[#8B5CF6] hover:bg-[#b07ff0] text-white rounded-lg"
              variants={hoverVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalRoot
  );
};

export default NotificationsModal;
