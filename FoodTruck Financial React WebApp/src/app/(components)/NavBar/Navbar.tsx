"use client";

import "@/app/globals.css";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode } from "@/app/state";
import { Bell, Moon, Search, Sun } from "lucide-react";
import React, { useCallback } from "react";
import { createSelector } from "reselect";

const selectGlobalState = (state: any) => state.global;
const selectDarkModeAndSidebar = createSelector(
  [selectGlobalState],
  (global) => ({
    isDarkMode: global.isDarkMode,
    isSidebarCollapsed: global.isSidebarCollapsed,
  })
);

const NavBar = React.memo(() => {
  const dispatch = useAppDispatch();
  const { isDarkMode, isSidebarCollapsed } = useAppSelector(
    selectDarkModeAndSidebar
  );
  const iconClassName = "cursor-pointer text-gray-500 hover:text-blue-300";

  const handleSearchClick = () => {};

  const handleThemeToggle = useCallback(() => {
    dispatch(setIsDarkMode(!isDarkMode));
  }, [dispatch, isDarkMode]);

  return (
    <div className="flex justify-between items-center w-full mb-7 bg-white h-20 px-3 border border-gray-300">
      <div className="flex items-center gap-5 ml-auto">
        <button onClick={handleSearchClick}>
          <Search className="cursor-pointer text-gray-500" size={24} />
        </button>
        <button onClick={handleThemeToggle}>
          {isDarkMode ? (
            <Sun className={iconClassName} size={24} />
          ) : (
            <Moon className={iconClassName} size={24} />
          )}
        </button>
        <div className="relative">
          <Bell className="cursor-pointer text-gray-500" size={24} />
          <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
            3
          </span>
        </div>
      </div>
    </div>
  );
});

NavBar.displayName = "NavBar";
export default NavBar;
