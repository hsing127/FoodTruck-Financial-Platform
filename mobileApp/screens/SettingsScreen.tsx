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
} from "lucide-react-native";

const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const backgroundColor = isDarkMode ? "bg-gray-900" : "bg-gray-50";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const cardBackground = isDarkMode ? "bg-gray-800" : "bg-white";
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
              value={true}
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

        {/* Privacy Section */}
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
              value={false}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
              className="ml-auto"
            />
          </View>
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
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
