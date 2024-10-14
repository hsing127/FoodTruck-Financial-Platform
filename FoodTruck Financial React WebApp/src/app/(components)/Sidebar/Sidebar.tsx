"use client";

import "@/app/globals.css";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/app/state";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Logo from "../../../assets/Logo.png";
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
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
          hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
            isActive ? "bg-blue-200 text-white" : ""
          }
        }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const handleToggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "pl-5" : "px-8"
        }`}
      >
        <div>
          <Image
            src={Logo}
            alt="FoodTruck Logo"
            width={isSidebarCollapsed ? 30 : 40}
            height={isSidebarCollapsed ? 30 : 40}
            layout="intrinsic"
            priority={true}
          />
        </div>
        <h1
          className={` ${
            isSidebarCollapsed ? "hidden" : "block"
          } font-bold text-2xl`}
        >
          Foodtrack
        </h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-300 rounded-full hover:bg-blue-100"
          onClick={handleToggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard/home"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/dashboard/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/dashboard/reports"
          icon={ClipboardList}
          label="Reports"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/dashboard/budget"
          icon={HandCoins}
          label="Budget"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/dashboard/inventory2"
          icon={PackageSearch}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/dashboard/upload"
          icon={Upload}
          label="Upload Files"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      <div className="pb-4">
        <SidebarLink
          href="/dashboard/oldDash/profile"
          icon={User}
          label="Account"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/dashboard/oldDash/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/"
          icon={LogOut}
          label="Logout"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-8 `}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 Foodtrack
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
