"use client";

import "@/app/globals.css";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode } from "@/app/state";
import { Bell, Moon, Search, Sun, Settings, Upload } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { setTheme } = useTheme();

  // State for handling upload dropdown visibility
  const [isUploadDropdownOpen, setIsUploadDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle theme toggle between light and dark modes
  const handleThemeToggle = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    dispatch(setIsDarkMode(!isDarkMode));
    setTheme(newTheme);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUploadDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Animation variants for the dropdown container and items
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.1, // Stagger children with a delay
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="z-10 flex justify-between items-center w-full bg-white h-[80px] px-4 mb-[-16px]">
      {/* Left side - Search input */}
      <div className="flex items-center gap-2">
        <div className="relative flex items-center w-[300px] bg-gray-100 rounded-lg px-3 py-2">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 text-sm text-gray-600 placeholder-gray-400 placeholder-opacity-75 w-full"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-2 text-[#8B5CF6]"
            aria-label="Settings"
          >
            <Settings size={20} />
          </motion.button>
        </div>
      </div>

      {/* Right Side - Icons section */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Upload Button with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <motion.button
            onClick={() => setIsUploadDropdownOpen((prev) => !prev)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg cursor-pointer text-gray-500 bg-gray-100 bg-opacity-25"
            aria-label="Upload"
          >
            <Upload size={24} />
          </motion.button>
          <AnimatePresence>
            {isUploadDropdownOpen && (
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
                      className="w-full text-left text-sm p-2 hover:bg-[#8B5CF6] hover:rounded-lg"
                      variants={itemVariants}
                      onClick={() => setIsUploadDropdownOpen(false)}
                    >
                      {item}
                    </motion.button>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme toggle button */}
        <motion.button
          onClick={handleThemeToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-[6px] rounded-lg cursor-pointer text-gray-500 hover:text-blue-300 bg-gray-100 bg-opacity-25"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </motion.button>

        {/* Notification button with badge */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer text-gray-500 bg-gray-100 bg-opacity-25 p-[6px] rounded-lg"
            aria-label="Notifications"
          >
            <Bell size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-gray-50 bg-red-400 rounded-full">
              3
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

NavBar.displayName = "NavBar";
export default NavBar;
