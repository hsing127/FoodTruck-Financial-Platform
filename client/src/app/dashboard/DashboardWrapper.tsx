import "@/app/globals.css";
import React, { useEffect, useMemo } from "react";
import StoreProvider, { useAppSelector } from "../redux";
import NavBar from "@/app/(components)/NavBar/Navbar";
import Sidebar from "@/app/(components)/Sidebar/Sidebar";
import { ThemeProvider } from "next-themes";

const DashboardWrapper = React.memo(
  ({ children }: { children: React.ReactNode }) => {
    // Get sidebar and dark mode state from redux
    const isSideBarCollapsed = useAppSelector(
      (state) => state.global.isSidebarCollapsed
    );
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    // Update HTML element classes when dark mode changes
    useEffect(() => {
      const htmlElement = document.documentElement;
      if (isDarkMode) {
        htmlElement.classList.add("dark"); // Add dark mode class
        htmlElement.classList.remove("light");
      } else {
        htmlElement.classList.add("light"); // Add light mode class
        htmlElement.classList.remove("dark");
      }
    }, [isDarkMode]);

    // Compute main container class names based on sidebar state
    const mainClassNames = useMemo(() => {
      return `flex flex-col w-full bg-gray-50 pl-[256px] transition-all duration-300 ${
        isSideBarCollapsed ? "pl-[66px]" : "pl-[256px]"
      }`;
    }, [isSideBarCollapsed]);

    return (
      <div
        className={`flex ${
          isDarkMode ? "dark" : "light"
        } bg-gray-50 text-gray-900 w-full min-h-screen`}
      >
        {/* Sidebar component */}
        <Sidebar />
        {/* Main content area */}
        <main className={mainClassNames}>
          <NavBar />
          {children} {/* Render children components */}
        </main>
      </div>
    );
  }
);

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      {/* Theme provider for dynamic theme switching */}
      <ThemeProvider>
        <DashboardWrapper>{children}</DashboardWrapper> {/* Main dashboard wrapper */}
      </ThemeProvider>
    </StoreProvider>
  );
};

DashboardWrapper.displayName = "DashboardWrapper"; // Set display name for DashboardWrapper
export default DashboardLayout;
