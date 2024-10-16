"use client";

import "@/app/globals.css";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/app/state";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo, useCallback } from "react";
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
  Sun,
  Upload,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = React.memo(
  ({ href, icon: Icon, label, isCollapsed }: SidebarLinkProps) => {
    const path = usePathname();
    const isActive = useMemo(
      () => path === href || href === "/dashboard",
      [path, href]
    );

    return (
      <Link href={href} aria-label={label}>
        <motion.div
          className={`cursor-pointer flex items-center ${
            isCollapsed ? "justify-start pl-4 ml-2" : "pl-4 ml-2"
          } py-4 hover:text-blue-500 z- hover:bg-blue-100 gap-3 transition-colors ${
            isActive ? "bg-blue-200 text-gray-900 rounded-lg" : "rounded-lg"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-6 h-6 flex-shrink-0">
            <Icon className="w-full h-full !text-gray-900" />
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
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const handleToggleSidebar = useCallback(() => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  }, [dispatch, isSidebarCollapsed]);

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-[66px]" : "w-[258px]"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  const mainLinks = useMemo(
    () => [
      { href: "/dashboard/home", icon: Layout, label: "Dashboard" },
      {
        href: "/dashboard/expenses",
        icon: CircleDollarSign,
        label: "Expenses",
      },
      { href: "/dashboard/reports", icon: ClipboardList, label: "Reports" },
      { href: "/dashboard/budget", icon: HandCoins, label: "Budget" },
      {
        href: "/dashboard/inventory2",
        icon: PackageSearch,
        label: "Inventory",
      },
      { href: "/dashboard/upload", icon: Upload, label: "Upload Files" },
    ],
    []
  );

  const bottomLinks = useMemo(
    () => [
      { href: "/dashboard/oldDash/profile", icon: User, label: "Account" },
      {
        href: "/dashboard/oldDash/settings",
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
        {!isSidebarCollapsed && (
          <motion.div className="flex items-center gap-2 pl-2">
            <Sun className="w-6 h-6 text-gray-900" />
            <span className="text-lg font-semibold pr-16">Foodtrack</span>
          </motion.div>
        )}

        <motion.button
          className=" px-2 py-2  hover:text-blue-100"
          onClick={handleToggleSidebar}
          aria-label="Toggle Sidebar"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span
            className={`inline-flex items-center justify-center rounded-lg bg-gray-100 bg-opacity-25`}
            style={{ width: "35px", height: "35px" }}
          >
            <Menu className="w-6 h-6" />
          </span>
        </motion.button>
      </div>

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

Sidebar.displayName = "Sidebar";
SidebarLink.displayName = "SidebarLink";

export default Sidebar;
