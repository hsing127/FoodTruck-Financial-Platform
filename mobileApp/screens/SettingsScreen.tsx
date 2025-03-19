import React from "react";
import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native";
import { useTheme } from "../ThemeContext";
import {
  User,
  Bell,
  Globe,
  Lock,
  ShieldCheck,
  Sun,
  Moon,
  Info,
  LogOut,
  Trash2,
  HelpCircle,
  MessageSquare,
  DollarSign,
} from "lucide-react-native";

const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const backgroundColor = isDarkMode ? "bg-gray-900" : "bg-gray-50";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const cardBackground = isDarkMode ? "bg-gray-800" : "bg-white";

  // Example state for toggles (in a real app, you'd fetch/update these from a server or global store)
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);

  return (
    <View className={`${backgroundColor} flex-1 px-5`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text className={`${textColor} text-2xl font-bold pt-10`}>
          Settings
        </Text>
        <Text className={`${textColor} text-lg mt-2`}>
          Manage your preferences
        </Text>

        {/* Profile Section */}
        <View className={`${cardBackground} p-5 mt-8 mb-5 rounded-xl`}>
          <Text className={`${textColor} text-lg font-semibold`}>Profile</Text>
          <View className="flex-row items-center mt-3">
            <User color={isDarkMode ? "white" : "black"} size={24} />
            <Text className={`${textColor} text-base ml-3`}>John Morgan</Text>
          </View>
          <TouchableOpacity className="flex-row items-center mt-4">
            <Text className="text-teal-500 text-base ml-3">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View className={`${cardBackground} p-5 mb-5 rounded-xl`}>
          <Text className={`${textColor} text-lg font-semibold`}>
            Notifications
          </Text>
          <View className="flex-row items-center mt-3">
            <Bell color={isDarkMode ? "white" : "black"} size={24} />
            <Text className={`${textColor} text-base ml-3`}>
              Push Notifications
            </Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
              className="ml-auto"
            />
          </View>
        </View>

        {/* Language Section */}
        <View className={`${cardBackground} p-5 mb-5 rounded-xl`}>
          <Text className={`${textColor} text-lg font-semibold`}>
            Language Preferences
          </Text>
          <View className="flex-row items-center mt-3">
            <Globe color={isDarkMode ? "white" : "black"} size={24} />
            <Text className={`${textColor} text-base ml-3`}>English</Text>
          </View>
          <TouchableOpacity className="flex-row items-center mt-4">
            <Text className="text-teal-500 text-base ml-3">
              Change Language
            </Text>
          </TouchableOpacity>
        </View>

        {/* Security Section */}
        <View className={`${cardBackground} p-5 mb-5 rounded-xl`}>
          <Text className={`${textColor} text-lg font-semibold`}>Security</Text>
          <View className="flex-row items-center mt-3">
            <Lock color={isDarkMode ? "white" : "black"} size={24} />
            <Text className={`${textColor} text-base ml-3`}>
              Change Password
            </Text>
          </View>
          <TouchableOpacity className="flex-row items-center mt-4">
            <Text className="text-teal-500 text-base ml-3">
              Update Password
            </Text>
          </TouchableOpacity>
        </View>

        {/* Privacy & Security Section */}
        <View className={`${cardBackground} p-5 mb-5 rounded-xl`}>
          <Text className={`${textColor} text-lg font-semibold`}>
            Privacy & Security
          </Text>
          <View className="flex-row items-center mt-3">
            <ShieldCheck color={isDarkMode ? "white" : "black"} size={24} />
            <Text className={`${textColor} text-base ml-3`}>
              Enable Two-Factor Authentication
            </Text>
            <Switch
              value={twoFactorEnabled}
              onValueChange={setTwoFactorEnabled}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
              className="ml-auto"
            />
          </View>
        </View>

        {/* Subscription Section */}
        <View className={`${cardBackground} p-5 mb-5 rounded-xl`}>
          <Text className={`${textColor} text-lg font-semibold`}>
            Subscription
          </Text>
          <View className="flex-row items-center mt-3">
            <DollarSign color={isDarkMode ? "white" : "black"} size={24} />
            <Text className={`${textColor} text-base ml-3`}>
              Current Plan: Premium
            </Text>
          </View>
          <TouchableOpacity className="flex-row items-center mt-4">
            <Text className="text-teal-500 text-base ml-3">
              Manage Subscription
            </Text>
          </TouchableOpacity>
        </View>

        {/* Appearance Section */}
        <View className={`${cardBackground} p-5 mb-5 rounded-xl`}>
          <Text className={`${textColor} text-lg font-semibold`}>
            Appearance
          </Text>
          <TouchableOpacity
            className="flex-row items-center mt-3"
            onPress={toggleTheme}
          >
            {isDarkMode ? (
              <Sun color="yellow" size={24} />
            ) : (
              <Moon color="black" size={24} />
            )}
            <Text className={`${textColor} text-base ml-3`}>
              {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View className={`${cardBackground} p-5 mb-5 rounded-xl`}>
          <Text className={`${textColor} text-lg font-semibold`}>About</Text>
          <View className="flex-row items-center mt-3">
            <Info color={isDarkMode ? "white" : "black"} size={24} />
            <Text className={`${textColor} text-base ml-3`}>
              App Version: 1.0.0
            </Text>
          </View>
        </View>

        {/* Help & Support Section */}
        <View className={`${cardBackground} p-5 mb-5 rounded-xl`}>
          <Text className={`${textColor} text-lg font-semibold`}>
            Help & Support
          </Text>
          <View className="flex-row items-center mt-3">
            <HelpCircle color={isDarkMode ? "white" : "black"} size={24} />
            <Text className={`${textColor} text-base ml-3`}>FAQ</Text>
          </View>
          <TouchableOpacity className="flex-row items-center mt-4">
            <MessageSquare color={isDarkMode ? "white" : "black"} size={20} />
            <Text className="text-teal-500 text-base ml-3">
              Contact Support
            </Text>
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View className={`${cardBackground} p-5 mb-5 rounded-xl`}>
          <Text className={`${textColor} text-lg font-semibold`}>
            Danger Zone
          </Text>
          <TouchableOpacity className="flex-row items-center mt-4">
            <Trash2 color="red" size={24} />
            <Text className="text-red-500 text-base ml-3">Delete Account</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="flex-row items-center justify-center mb-8 mt-3"
          onPress={() => {
            // Logout logic
          }}
        >
          <LogOut color={isDarkMode ? "white" : "black"} size={24} />
          <Text
            className={`${
              isDarkMode ? "text-white" : "text-gray-900"
            } text-base ml-3`}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
