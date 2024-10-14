import "@/app/globals.css";
import React, { useEffect } from "react";
import StoreProvider, { useAppSelector } from "../redux";
import NavBar from "@/app/(components)/NavBar/Navbar";
import Sidebar from "@/app/(components)/Sidebar/Sidebar";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });

  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full bg-gray-50 pl-16 transition-all duration-300
          ${isSideBarCollapsed ? "md:pl-18" : "md:pl-[256px]"}`}
      >
        <NavBar />
        {children}
      </main>
    </div>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardWrapper>{children}</DashboardWrapper>
    </StoreProvider>
  );
};

export default DashboardLayout;
