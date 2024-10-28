"use client";

import "@/app/globals.css";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/app/state";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo, useCallback, useState } from "react";
import {
  CircleDollarSign,
  ClipboardList,
  HandCoins,
  Layout,
  LogOut,
  LucideIcon,
  Menu,
  MenuSquare,
  PackageSearch,
  SlidersHorizontal,
  Sun,
  Upload,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon; // Icon component passed as a prop
  label: string; // Label for the link
  isCollapsed: boolean; // Boolean to check if the sidebar is collapsed
}

const SidebarLink = React.memo(
  ({ href, icon: Icon, label, isCollapsed }: SidebarLinkProps) => {
    const path = usePathname(); // Get current path to highlight active link
    const isActive = useMemo(
      () => path === href || href === "/dashboard", // Check if the link is active
      [path, href]
    );

    return (
      <Link href={href} aria-label={label}>
        <motion.div
          className={`cursor-pointer flex items-center ${
            isCollapsed ? "justify-start px-[17px] ml-3" : "px-[17px] ml-3"
          } py-4 hover:text-gray-900 hover:bg-blue-100 gap-3 transition-colors ${
            isActive ? "bg-blue-200 text-gray-900 rounded-xl" : "rounded-xl"
          }`}
          whileHover={{ scale: 1.05 }} // Animation on hover
          whileTap={{ scale: 0.95 }} // Animation on tap
          animate={{ y: isActive ? -2 : 0 }} // Bounce effect for active link
          transition={{ type: "spring", stiffness: 300, damping: 20 }} // Smooth spring animation with bounce effect
        >
          <div className="w-6 h-6 flex-shrink-0">
            <Icon className="w-full h-full !text-gray-900" />{" "}
            {/* Icon display */}
          </div>
          {!isCollapsed && (
            <motion.span
              className="ml-2 whitespace-nowrap"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      </Link>
    );
  }
);

const Sidebar = React.memo(() => {
  const dispatch = useAppDispatch(); // Redux dispatch to toggle sidebar
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  ); // Get sidebar state from redux

  const [isOverflowHidden, setIsOverflowHidden] = useState(false); // State for controlling overflow visibility

  // Function to handle sidebar toggle, with overflow visibility delay
  const handleToggleSidebar = useCallback(() => {
    setIsOverflowHidden(true); // Hide overflow during transition
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));

    // Delay to allow animation to complete, then show overflow
    setTimeout(() => {
      setIsOverflowHidden(false);
    }, 300); // Match this duration to the animation duration
  }, [dispatch, isSidebarCollapsed]);

  // Sidebar class names based on collapsed state
  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-[70px]" : "w-[260px]"
  } ${
    isOverflowHidden ? "overflow-hidden" : "overflow-visible"
  } bg-white transition-all duration-300 h-full shadow-md z-40`;

  // Main links for the sidebar
  const mainLinks = useMemo(
    () => [
      { href: "/dashboard/home", icon: Layout, label: "Dashboard" },
      {
        href: "/dashboard/purchases",
        icon: CircleDollarSign,
        label: "Purchases",
      },
      { href: "/dashboard/menu", icon: MenuSquare, label: "Menu" },
      {
        href: "/dashboard/inventory2",
        icon: PackageSearch,
        label: "Inventory",
      },
      { href: "/dashboard/reports", icon: ClipboardList, label: "Reports" },
      { href: "/dashboard/budget", icon: HandCoins, label: "Budget" },
    ],
    []
  );

  // Bottom links for the sidebar
  const bottomLinks = useMemo(
    () => [
      { href: "/dashboard/oldDash/profile", icon: User, label: "Account" },
      {
        href: "/dashboard/settings",
        icon: SlidersHorizontal,
        label: "Settings",
      },
      { href: "/", icon: LogOut, label: "Logout" },
    ],
    []
  );

  return (
    <div className={sidebarClassNames}>
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-4 ${
          isSidebarCollapsed ? "pl-3" : "pl-3"
        }`}
      >
        {/* Logo and name when not collapsed */}
        {!isSidebarCollapsed && (
          <motion.div className="flex items-center gap-2 pl-4">
            <Sun className="w-6 h-6 text-gray-900" />
            <span className="text-lg font-semibold pr-[60px]">Foodtrack</span>
          </motion.div>
        )}

        {/* Sidebar toggle button */}
        <motion.button
          className="pl-3 py-2 hover:text-blue-100"
          onClick={handleToggleSidebar}
          aria-label="Toggle Sidebar"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span
            className="inline-flex items-center justify-center rounded-lg bg-gray-100 bg-opacity-25"
            style={{ width: "35px", height: "35px" }}
          >
            <Menu className="w-6 h-6" />
          </span>
        </motion.button>
      </div>

      {/* Main section of links */}
      <div className="flex-grow mt-8">
        {mainLinks.map((link) => (
          <SidebarLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isCollapsed={isSidebarCollapsed}
          />
        ))}
      </div>

      {/* Bottom section of links */}
      <div className="mb-8">
        {bottomLinks.map((link) => (
          <SidebarLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isCollapsed={isSidebarCollapsed}
          />
        ))}
      </div>

      {/* Footer message when not collapsed */}
      {!isSidebarCollapsed && (
        <div className="mb-8">
          <p className="text-center text-xs text-gray-500">
            &copy; 2024 Foodtrack
          </p>
        </div>
      )}
    </div>
  );
});

Sidebar.displayName = "Sidebar"; // Set display name for Sidebar
SidebarLink.displayName = "SidebarLink"; // Set display name for SidebarLink

export default Sidebar;
