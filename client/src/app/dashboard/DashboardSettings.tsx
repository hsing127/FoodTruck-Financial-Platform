// Import necessary modules
import "@/app/globals.css";
import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import DashboardLayout from "./DashboardWrapper";
import Profile from "@/app/(components)/DashboardSettingsComponents/profile";
import Notifications from "../(components)/DashboardSettingsComponents/notifications";
import Language from "../(components)/DashboardSettingsComponents/language";
import Security from "../(components)/DashboardSettingsComponents/security";
import DeleteAccount from "../(components)/DashboardSettingsComponents/delete";
import Accounts from "../(components)/DashboardSettingsComponents/accounts";

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, 
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3, // Animation duration for each item
      ease: "easeOut",
    },
  },
};

// DashboardSettings Component
export const DashboardSettings: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="outline outline-white outline-8 flex-1 relative border-white rounded-3xl border-[16px] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
          <motion.div
            className="pt-6 mx-auto space-y-6 mb-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Profile />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Notifications />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Security />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Language />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Accounts />
            </motion.div>
            <motion.div variants={itemVariants}>
              <DeleteAccount />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};
