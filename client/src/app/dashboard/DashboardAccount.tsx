import React from "react";
import DashboardLayout from "./DashboardWrapper";
import ProfileCard from "../(components)/DashboardAccountComponents/profile";
import PasswordCard from "../(components)/DashboardAccountComponents/password";
import NotificationsCard from "../(components)/DashboardAccountComponents/notifications";

export const DashboardAccount: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto py-8">
        <ProfileCard />
        <PasswordCard />
        <NotificationsCard />
      </div>
    </DashboardLayout>
  );
};

