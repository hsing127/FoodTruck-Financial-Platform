"use client";

import "@/app/globals.css";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/app/state";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  CircleDollarSign,
  ClipboardList,
  HandCoins,
  Layout,
  LogOut,
  LucideIcon,
  Menu,
  PackageSearch,
  SlidersHorizontal,
  Upload,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const path = usePathname();
  const isActive = path === href || href === "/dashboard";

  return (
    <Link href={href}>
      <motion.div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-start pl-5" : "pl-5"
        } py-4 hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-gray-900" : ""
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-6 h-6 flex-shrink-0">
          <Icon className="w-full h-full !text-gray-900" />
        </div>
        <AnimatePresence>
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
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};

// Sidebar Component
const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const handleToggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-[66px]" : "w-[258px]"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40 border border-gray-300`;
  
  const sidebarLinks = [
    { href: "/dashboard/home", icon: Layout, label: "Dashboard" },
    { href: "/dashboard/expenses", icon: CircleDollarSign, label: "Expenses" },
    { href: "/dashboard/reports", icon: ClipboardList, label: "Reports" },
    { href: "/dashboard/budget", icon: HandCoins, label: "Budget" },
    { href: "/dashboard/inventory2", icon: PackageSearch, label: "Inventory" },
    { href: "/dashboard/upload", icon: Upload, label: "Upload Files" },
  ];

  const bottomLinks = [
    { href: "/dashboard/oldDash/profile", icon: User, label: "Account" },
    {
      href: "/dashboard/oldDash/settings",
      icon: SlidersHorizontal,
      label: "Settings",
    },
    { href: "/", icon: LogOut, label: "Logout" },
  ];

  return (
    <div className={sidebarClassNames} >
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "pl-3" : "pl-3"
        }`}
      >
        <div>
          <motion.button
            className="px-2 py-2 rounded-full hover:bg-blue-100"
            onClick={handleToggleSidebar}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Main Links */}
      <div className="flex-grow mt-8">
        {sidebarLinks.map((link) => (
          <SidebarLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isCollapsed={isSidebarCollapsed}
          />
        ))}
      </div>

      {/* Bottom Links */}
      <div className="pb-4">
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

      {/* Footer */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-8`}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 Foodtrack
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
