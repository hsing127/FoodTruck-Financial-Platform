import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ContextMenuProps {
  options: string[];
  onSelect: (option: string, e: React.MouseEvent) => void;
  position: { x: number; y: number };
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  options,
  onSelect,
  position,
  onClose,
}) => {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Adjust position to prevent overflow
  useEffect(() => {
    if (contextMenuRef.current) {
      const { innerWidth, innerHeight } = window;
      const rect = contextMenuRef.current.getBoundingClientRect();

      let newX = position.x;
      let newY = position.y;

      // Adjust horizontal position if overflow
      if (position.x + rect.width > innerWidth) {
        newX = innerWidth - rect.width - 10;
      }

      // Adjust vertical position if overflow
      if (position.y + rect.height > innerHeight) {
        newY = innerHeight - rect.height - 10;
      }

      setAdjustedPosition({ x: newX, y: newY });
    }
  }, [position]);

  // Context menu animation variants
  const contextMenuVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  // Create the portal element if it doesn't exist
  const portalElement =
    document.getElementById("context-menu-portal") || createPortalElement();

  function createPortalElement() {
    const el = document.createElement("div");
    el.id = "context-menu-portal";
    document.body.appendChild(el);
    return el;
  }

  const contextMenu = (
    <div
      style={{
        position: "fixed",
        top: adjustedPosition.y,
        left: adjustedPosition.x,
        zIndex: 1000,
      }}
    >
      <AnimatePresence>
        <motion.div
          className="bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contextMenuVariants}
          transition={{ duration: 0.2 }}
          ref={contextMenuRef}
        >
          {options.map((option, index) => (
            <motion.button
              key={option}
              onClick={(e) => {
                onSelect(option, e);
                onClose();
              }}
              className={`w-full px-4 py-2 text-sm text-left hover:bg-[#8B5CF6] hover:text-white cursor-pointer text-black`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.05 }}
            >
              {option}
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return createPortal(contextMenu, portalElement);
};

export default ContextMenu;
