"use client";

import { usePathname } from "next/navigation";
import React from "react";
import DashboardWrapper from "./dashboard/DashboardWrapper";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Client-side hook
  const isDashboard = pathname?.startsWith("/dashboard") ?? false;

  return (
    <>
      {isDashboard ? <DashboardWrapper>{children}</DashboardWrapper> : children}
    </>
  );
}
