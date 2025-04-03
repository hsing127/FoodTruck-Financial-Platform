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

// Reusable setting row with optional toggle or right-action
const SettingRow = ({
  icon: Icon,
  label,
  value,
  onPress,
  toggle,
  isEnabled,
  onToggle,
  isDark,
}: any) => {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between py-4"
      onPress={onPress}
      disabled={!onPress}
    >
      <View className="flex-row items-center">
        <Icon color={isDark ? "white" : "black"} size={22} />
        <Text className={`ml-3 text-base ${isDark ? "text-white" : "text-gray-900"}`}>
          {label}
        </Text>
      </View>
      {toggle ? (
        <Switch
          value={isEnabled}
          onValueChange={onToggle}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
        />
      ) : (
        value && <Text className="text-sm text-gray-400">{value}</Text>
      )}
    </TouchableOpacity>
  );
};

const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const backgroundColor = isDarkMode ? "bg-gray-900" : "bg-gray-50";
  const cardBackground = isDarkMode ? "bg-gray-800" : "bg-white";

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);

  return (
    <View className={`${backgroundColor} flex-1`}>
      <ScrollView showsVerticalScrollIndicator={false} className="px-5 pt-10">
        <Text className={`text-3xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Settings
        </Text>
        <Text className={`text-base mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          Customize your experience
        </Text>

        {/* === Profile === */}
        <View className={`${cardBackground} rounded-xl p-5 mb-5`}>
          <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Profile
          </Text>
          <SettingRow
            icon={User}
            label="John Morgan"
            isDark={isDarkMode}
            onPress={() => {}}
          />
          <TouchableOpacity className="mt-3">
            <Text className="text-teal-500 text-sm">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* === Preferences === */}
        <View className={`${cardBackground} rounded-xl p-5 mb-5`}>
          <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Preferences
          </Text>
          <SettingRow
            icon={Bell}
            label="Push Notifications"
            toggle
            isEnabled={notificationsEnabled}
            onToggle={setNotificationsEnabled}
            isDark={isDarkMode}
          />
          <SettingRow
            icon={Globe}
            label="Language"
            value="English"
            onPress={() => {}}
            isDark={isDarkMode}
          />
          <TouchableOpacity className="mt-3">
            <Text className="text-teal-500 text-sm">Change Language</Text>
          </TouchableOpacity>
        </View>

        {/* === Security === */}
        <View className={`${cardBackground} rounded-xl p-5 mb-5`}>
          <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Security
          </Text>
          <SettingRow
            icon={Lock}
            label="Change Password"
            onPress={() => {}}
            isDark={isDarkMode}
          />
          <SettingRow
            icon={ShieldCheck}
            label="Two-Factor Authentication"
            toggle
            isEnabled={twoFactorEnabled}
            onToggle={setTwoFactorEnabled}
            isDark={isDarkMode}
          />
        </View>

        {/* === Appearance === */}
        <View className={`${cardBackground} rounded-xl p-5 mb-5`}>
          <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Appearance
          </Text>
          <TouchableOpacity onPress={toggleTheme} className="flex-row items-center py-2">
            {isDarkMode ? <Sun color="yellow" size={22} /> : <Moon color="black" size={22} />}
            <Text className={`ml-3 text-base ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* === Subscription === */}
        <View className={`${cardBackground} rounded-xl p-5 mb-5`}>
          <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Subscription
          </Text>
          <SettingRow
            icon={DollarSign}
            label="Current Plan"
            value="Premium"
            isDark={isDarkMode}
          />
          <TouchableOpacity className="mt-3">
            <Text className="text-teal-500 text-sm">Manage Subscription</Text>
          </TouchableOpacity>
        </View>

        {/* === About & Support === */}
        <View className={`${cardBackground} rounded-xl p-5 mb-5`}>
          <Text className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Help & About
          </Text>
          <SettingRow icon={Info} label="App Version" value="1.0.0" isDark={isDarkMode} />
          <SettingRow icon={HelpCircle} label="FAQ" onPress={() => {}} isDark={isDarkMode} />
          <TouchableOpacity className="flex-row items-center mt-3">
            <MessageSquare color={isDarkMode ? "white" : "black"} size={20} />
            <Text className="ml-3 text-teal-500 text-sm">Contact Support</Text>
          </TouchableOpacity>
        </View>

        {/* === Danger Zone === */}
        <View className={`${cardBackground} rounded-xl p-5 mb-5`}>
          <Text className={`text-lg font-semibold text-red-500`}>Danger Zone</Text>
          <TouchableOpacity className="flex-row items-center mt-4">
            <Trash2 color="red" size={22} />
            <Text className="ml-3 text-red-500 text-base">Delete Account</Text>
          </TouchableOpacity>
        </View>

        {/* === Logout === */}
        <TouchableOpacity
          className="flex-row items-center justify-center my-6"
          onPress={() => {
            // Logout logic here
          }}
        >
          <LogOut color={isDarkMode ? "white" : "black"} size={22} />
          <Text className={`ml-2 text-base ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
