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
  // State hooks for dropdown visibility
  const [uploadDropdownOpen, setUploadDropdownOpen] = useState(false);
  const [addEntryDropdownOpen, setAddEntryDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  // Function to toggle dropdowns
  const toggleDropdown = (type: string) => {
    if (type === "upload") {
      setUploadDropdownOpen(!uploadDropdownOpen);
      setAddEntryDropdownOpen(false);
      setFilterDropdownOpen(false);
    } else if (type === "addEntry") {
      setAddEntryDropdownOpen(!addEntryDropdownOpen);
      setUploadDropdownOpen(false);
      setFilterDropdownOpen(false);
    } else if (type === "filter") {
      setFilterDropdownOpen(!filterDropdownOpen);
      setUploadDropdownOpen(false);
      setAddEntryDropdownOpen(false);
    }
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="flex items-center justify-between w-full space-x-4 pr-6 relative">
      {/* Search Bar on the left */}
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

      {/* Buttons on the right */}
      <div className="flex items-center space-x-2">
        {/* File Upload Button */}
        <div className="relative">
          <button
            className="bg-gray-50 rounded-lg p-2 focus:outline-none hover:bg-gray-200"
            title="Upload File"
            onClick={() => toggleDropdown("upload")}
          >
            <Upload className="text-gray-600" size={20} />
          </button>
          {/* Dropdown for Upload */}
          <AnimatePresence>
            {uploadDropdownOpen && (
              <motion.div
                className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-40 z-10"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {["Upload Image", "Upload Document", "Upload Spreadsheet"].map(
                  (item, index) => (
                    <motion.button
                      key={index}
                      className="w-full text-left text-sm p-2 hover:bg-gray-200"
                      variants={itemVariants}
                    >
                      {item}
                    </motion.button>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Manual Entry Button */}
        <div className="relative">
          <button
            className="bg-gray-50 rounded-lg p-2 focus:outline-none hover:bg-gray-200"
            title="Add Entry"
            onClick={() => toggleDropdown("addEntry")}
          >
            <Plus className="text-gray-600" size={20} />
          </button>
          {/* Dropdown for Add Entry */}
          <AnimatePresence>
            {addEntryDropdownOpen && (
              <motion.div
                className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-40 z-10"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {["Add Manual Entry", "Add Expense"].map((item, index) => (
                  <motion.button
                    key={index}
                    className="w-full text-left text-sm p-2 hover:bg-gray-200"
                    variants={itemVariants}
                  >
                    {item}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filter Button */}
        <div className="relative">
          <button
            className="bg-gray-50 rounded-lg p-2 focus:outline-none hover:bg-gray-200"
            title="Filter"
            onClick={() => toggleDropdown("filter")}
          >
            <Filter className="text-gray-600" size={20} />
          </button>
          {/* Dropdown for Filter */}
          <AnimatePresence>
            {filterDropdownOpen && (
              <motion.div
                className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-40 z-10"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {["Filter by Date", "Filter by Location", "Filter by Cost"].map(
                  (item, index) => (
                    <motion.button
                      key={index}
                      className="w-full text-left text-sm p-2 hover:bg-gray-200"
                      variants={itemVariants}
                    >
                      {item}
                    </motion.button>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
