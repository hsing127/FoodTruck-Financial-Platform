import React, { useState } from "react";
import { Search, Upload, Plus, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchInputProps {
  searchInput: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchInput,
  handleSearch,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Toggle dropdown visibility based on the clicked type
  const toggleDropdown = (type: string) => {
    setActiveDropdown((prev) => (prev === type ? null : type));
  };

  // Animation variants for dropdown container and items
  const dropdownVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.05, when: "beforeChildren", staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  // Common rendering for dropdowns
  const renderDropdown = (items: string[]) => (
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
          className="w-full text-left text-sm p-2 hover:bg-gray-200"
          variants={itemVariants}
        >
          {item}
        </motion.button>
      ))}
    </motion.div>
  );

  return (
    <div className="flex items-center justify-between w-full space-x-4 pr-6 relative">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 w-80">
        <Search className="text-gray-600" size={20} />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 placeholder-opacity-75 pl-2"
          onChange={handleSearch}
          value={searchInput}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        {[{
            icon: <Upload size={20} />,
            type: "upload",
            title: "Upload File",
            items: ["Upload Image", "Upload Document", "Upload Spreadsheet"],
          },
          {
            icon: <Plus size={20} />,
            type: "addEntry",
            title: "Add Entry",
            items: ["Add Manual Entry", "Add Expense"],
          },
          {
            icon: <Filter size={20} />,
            type: "filter",
            title: "Filter",
            items: ["Filter by Date", "Filter by Location", "Filter by Cost"],
          },
        ].map(({ icon, type, title, items }) => (
          <div key={type} className="relative">
            <button
              className="bg-gray-50 rounded-lg p-2 focus:outline-none hover:bg-gray-200"
              title={title}
              onClick={() => toggleDropdown(type)}
            >
              {icon}
            </button>
            <AnimatePresence>
              {activeDropdown === type && renderDropdown(items)}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchInput;
