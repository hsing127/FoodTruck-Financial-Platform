import React from "react";
import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native";
import { useTheme } from "../ThemeContext";
import { User, Bell, Globe, Lock } from "lucide-react-native";

const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const backgroundColor = isDarkMode ? "bg-gray-900" : "bg-gray-50";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const buttonBackground = isDarkMode ? "bg-teal-500" : "bg-gray-900";
  const buttonText = isDarkMode ? "text-gray-900" : "text-white";

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
        <View
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } p-5 mt-8 mb-5 rounded-xl`}
        >
          <Text className={`${textColor} text-lg font-semibold`}>Profile</Text>
          <View className="flex-row items-center mt-3">
            <User color={textColor} size={24} />
            <Text className={`${textColor} text-base ml-3`}>John Morgan</Text>
          </View>
          <TouchableOpacity className="flex-row items-center mt-4">
            <Text className={`${textColor} text-base ml-3`}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } p-5 mb-5 rounded-xl`}
        >
          <Text className={`${textColor} text-lg font-semibold`}>
            Notifications
          </Text>
          <View className="flex-row items-center mt-3">
            <Bell color={textColor} size={24} />
            <Text className={`${textColor} text-base ml-3`}>
              Push Notifications
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
              className="ml-auto"
            />
          </View>
        </View>

        {/* Language Section */}
        <View
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } p-5 mb-5 rounded-xl`}
        >
          <Text className={`${textColor} text-lg font-semibold`}>
            Language Preferences
          </Text>
          <View className="flex-row items-center mt-3">
            <Globe color={textColor} size={24} />
            <Text className={`${textColor} text-base ml-3`}>English</Text>
          </View>
          <TouchableOpacity className="flex-row items-center mt-4">
            <Text className={`${textColor} text-base ml-3`}>
              Change Language
            </Text>
          </TouchableOpacity>
        </View>

        {/* Security Section */}
        <View
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } p-5 mb-5 rounded-xl`}
        >
          <Text className={`${textColor} text-lg font-semibold`}>Security</Text>
          <View className="flex-row items-center mt-3">
            <Lock color={textColor} size={24} />
            <Text className={`${textColor} text-base ml-3`}>
              Change Password
            </Text>
          </View>
          <TouchableOpacity className="flex-row items-center mt-4">
            <Text className={`${textColor} text-base ml-3`}>
              Update Password
            </Text>
          </TouchableOpacity>
        </View>

        {/* Toggle Theme Button */}
        <TouchableOpacity
          onPress={toggleTheme}
          className={`${buttonBackground} p-3 rounded-xl mt-8 mx-auto`}
        >
          <Text className={`${buttonText} text-base font-semibold`}>
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
