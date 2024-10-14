import "@/app/globals.css";
import React, { useEffect, useMemo } from "react";
import StoreProvider, { useAppSelector } from "../redux";
import NavBar from "@/app/(components)/NavBar/Navbar";
import Sidebar from "@/app/(components)/Sidebar/Sidebar";

const DashboardWrapper = React.memo(
  ({ children }: { children: React.ReactNode }) => {
    const isSideBarCollapsed = useAppSelector(
      (state) => state.global.isSidebarCollapsed
    );
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    useEffect(() => {
      const htmlElement = document.documentElement;
      if (isDarkMode) {
        htmlElement.classList.add("dark");
        htmlElement.classList.remove("light");
      } else {
        htmlElement.classList.add("light");
        htmlElement.classList.remove("dark");
      }
    }, [isDarkMode]);

    const mainClassNames = useMemo(() => {
      return `flex flex-col w-full h-full bg-gray-50 pl-16 transition-all duration-300 ${
        isSideBarCollapsed ? "md:pl-18" : "md:pl-[256px]"
      }`;
    }, [isSideBarCollapsed]);

    return (
      <div
        className={`flex ${
          isDarkMode ? "dark" : "light"
        } bg-gray-50 text-gray-900 w-full min-h-screen`}
      >
        <Sidebar />
        <main className={mainClassNames}>
          <NavBar />
          {children}
        </main>
      </div>
    );
  }
);

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardWrapper>{children}</DashboardWrapper>
    </StoreProvider>
  );
};

export default DashboardLayout;
