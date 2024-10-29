"use client";

import "@/app/globals.css";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode } from "@/app/state";
import { Bell, Moon, Search, Sun, Settings, Upload } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { motion } from "framer-motion";

const NavBar = () => {
  // Redux dispatch and selector to toggle dark mode
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { setTheme } = useTheme(); // Theme hook from next-themes for dynamic theme switching

  // Placeholder for search button functionality
  const handleSearchClick = () => {};

  // Function to handle theme toggle between light and dark modes
  const handleThemeToggle = () => {
    const newTheme = isDarkMode ? "light" : "dark"; // Determine new theme based on current mode
    dispatch(setIsDarkMode(!isDarkMode)); // Update global state
    setTheme(newTheme); // Update next-themes' state
  };

  return (
    <div className="z-10 flex justify-between items-center w-full bg-white h-[80px] px-4 mb-[-16px]">
      {/* Left side - Search input */}
      <div className="flex items-center gap-2">
        <div className="relative flex items-center w-[300px] bg-gray-100 rounded-lg px-3 py-2">
          {/* Search icon */}
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 text-sm text-gray-600 placeholder-gray-400 placeholder-opacity-75 w-full"
          />
          {/* Settings button with animation */}
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
        {/* Upload button */}
        <motion.button
          onClick={handleSearchClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-[6px] rounded-lg cursor-pointer text-gray-500 bg-gray-100 bg-opacity-25"
          aria-label="Upload"
        >
          <Upload size={24} />
        </motion.button>

        {/* Theme toggle button */}
        <motion.button
          onClick={handleThemeToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-[6px] rounded-lg cursor-pointer text-gray-500 hover:text-blue-300 bg-gray-100 bg-opacity-25"
          aria-label="Toggle Theme"
        >
          {/* Conditional rendering based on dark mode */}
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
            {/* Badge for notification count */}
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-gray-50 bg-red-400 rounded-full">
              3
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

NavBar.displayName = "NavBar"; // Set component display name
export default NavBar;
