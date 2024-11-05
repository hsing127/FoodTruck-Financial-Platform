import "@/app/globals.css";
import React from "react";
import DashboardLayout from "./DashboardWrapper";
import Profile from "@/app/(components)/DashboardSettingsComponents/profile";
import Notifications from "../(components)/DashboardSettingsComponents/notifications";
import Language from "../(components)/DashboardSettingsComponents/language";
import Security from "../(components)/DashboardSettingsComponents/security";
import DeleteAccount from "../(components)/DashboardSettingsComponents/delete";

export const DashboardSettings: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="outline outline-white outline-8 flex-1 relative border-white rounded-3xl border-[16px] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
          <div className="pt-6 mx-auto space-y-6 mb-4">
            <Profile />
            <Notifications />
            <Security />
            <Language />
            <DeleteAccount />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
