import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../ThemeContext";

const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const backgroundColor = isDarkMode ? "#1A2C3A" : "#F5F5F5";
  const textColor = isDarkMode ? "#FFFFFF" : "#1A2C3A";
  const buttonBackground = isDarkMode ? "#00D1D1" : "#1A2C3A";
  const buttonText = isDarkMode ? "#1A2C3A" : "#FFFFFF";

  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text className="text-2xl font-bold" style={{ color: textColor }}>
        Settings
      </Text>
      <Text className="text-lg mt-2" style={{ color: textColor }}>
        Manage your preferences
      </Text>

      {/* Toggle Theme Button */}
      <TouchableOpacity
        onPress={toggleTheme}
        style={{
          marginTop: 20,
          backgroundColor: buttonBackground,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: buttonText, fontSize: 16, fontWeight: "bold" }}>
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
