import React from "react";
import { View, Text } from "react-native";
import "../global.css";

const ProfileScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-500">Profile</Text>
      <Text className="text-lg text-gray-600 mt-2">This is the Profile screen</Text>
    </View>
  );
};

export default ProfileScreen;
