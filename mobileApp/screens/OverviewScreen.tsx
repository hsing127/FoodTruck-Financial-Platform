import React from "react";
import { View, Text } from "react-native";
import "../global.css";

const OverviewScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-500">Overview</Text>
      <Text className="text-lg text-gray-600 mt-2">This is the Overview screen</Text>
    </View>
  );
};

export default OverviewScreen;
