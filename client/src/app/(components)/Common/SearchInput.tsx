import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, Upload, Plus, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchInputProps {
  searchInput: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  actions: Array<{
    icon: React.ReactNode;
    type: string;
    title: string;
    items: string[];
  }>;
  onActionItemClick?: (actionType: string, item: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchInput,
  handleSearch,
  actions,
  onActionItemClick,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setActiveDropdown(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Toggle dropdown
  const toggleDropdown = useCallback(
    (type: string) =>
      setActiveDropdown((prev) => (prev === type ? null : type)),
    []
  );

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.05,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex items-center justify-between w-full space-x-4 relative">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 w-80">
        <Search className="text-gray-600" size={20} />
        <input
          type="text"
          placeholder="Search..."
          className="w-80 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 pl-2"
          onChange={handleSearch}
          value={searchInput}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2" ref={dropdownRef}>
        {actions.map(({ icon, type, title, items }) => (
          <div key={type} className="relative">
            <button
              className="bg-gray-50 rounded-lg p-2 focus:outline-none hover:text-blue-400 hover:bg-gray-200"
              title={title}
              onClick={() => toggleDropdown(type)}
            >
              {icon}
            </button>
            <AnimatePresence>
              {activeDropdown === type && (
                <motion.div
                  className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-40 z-10"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {items.map((item, index) => (
                    <motion.button
                      key={index}
                      className="w-full text-left text-sm p-2 hover:bg-[#8B5CF6] hover:rounded-lg"
                      variants={itemVariants}
                      onClick={() => {
                        onActionItemClick?.(type, item);
                        setActiveDropdown(null); // Close the dropdown after clicking
                      }}
                    >
                      {item}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchInput;
