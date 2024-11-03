import React from "react";
import DashboardLayout from "./DashboardWrapper";
import ProfileCard from "../(components)/DashboardAccountComponents/profile";
import PasswordCard from "../(components)/DashboardAccountComponents/password";
import Accounts from "../(components)/DashboardAccountComponents/accounts";

export const DashboardAccount: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="outline outline-white outline-8 flex-1 relative border-white rounded-3xl border-[16px] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
          <div className="pt-6 mx-auto space-y-6 mb-4">
            <ProfileCard />
            <PasswordCard />
            <Accounts />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
