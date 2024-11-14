// Dropdown.tsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

interface DropdownProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownIdRef = useRef<string>(
    `dropdown-${Math.random().toString(36).substr(2, 9)}`
  );

  // Function to toggle dropdown open state
  const toggleDropdown = () => {
    if (!isOpen) {
      // Emit a custom event when opening
      const event = new CustomEvent("dropdown-opened", {
        detail: { id: dropdownIdRef.current },
      });
      window.dispatchEvent(event);
    }
    setIsOpen((prev) => !prev);
  };

  // Close dropdown when another dropdown is opened
  useEffect(() => {
    const handleDropdownOpened = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail.id !== dropdownIdRef.current) {
        setIsOpen(false);
      }
    };

    window.addEventListener("dropdown-opened", handleDropdownOpened);

    return () => {
      window.removeEventListener("dropdown-opened", handleDropdownOpened);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="p-2 rounded-xl bg-gray-50/50 hover:bg-gray-100 transition duration-300 cursor-pointer"
        onClick={toggleDropdown}
      >
        <MoreHorizontal className="w-6 h-6 text-gray-700" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-10"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            transition={{ duration: 0.2 }}
          >
            {options.map((option, index) => (
              <motion.button
                key={option}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-sm text-left hover:bg-[#8B5CF6] ${
                  selected === option
                    ? "bg-[#8B5CF6] text-white font-semibold"
                    : "text-black"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
