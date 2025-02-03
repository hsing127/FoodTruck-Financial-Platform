import React from "react";
import { View, Text } from "react-native";
import "../global.css";

const SettingsScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-500">Settings</Text>
      <Text className="text-lg text-gray-600 mt-2">Manage your preferences</Text>
    </View>
  );
};

export default SettingsScreen;
