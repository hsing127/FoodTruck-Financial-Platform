"use client";

import "@/app/globals.css";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode } from "@/app/state";
import { Bell, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { setTheme } = useTheme();

  const handleSearchClick = () => {};

  const handleThemeToggle = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    dispatch(setIsDarkMode(!isDarkMode));
    setTheme(newTheme);
  };

  return (
    <div className="flex justify-between items-center w-full bg-white h-[80px] px-6 mb-[-16px]">
      {/* Right Side (Icons) */}
      <div className="flex items-center gap-5 ml-auto">
        <div>
          <button onClick={handleSearchClick}>
            <Search className="cursor-pointer text-gray-500" size={24} />
          </button>
        </div>
        <div>
          <button onClick={handleThemeToggle}>
            {isDarkMode ? (
              <Sun
                className="cursor-pointer text-gray-500 hover:text-blue-300"
                size={24}
              />
            ) : (
              <Moon
                className="cursor-pointer text-gray-500 hover:text-blue-300"
                size={24}
              />
            )}
          </button>
        </div>
        <div className="relative">
          <Bell className="cursor-pointer text-gray-500" size={24} />
          <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
            3
          </span>
        </div>
      </div>
    </div>
  );
};

NavBar.displayName = "Navbar";
export default NavBar;
