import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import "../global.css";

const ProfileScreen = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="items-center bg-white py-8 px-4 shadow-md">
        <Image 
          source={{ uri: 'https://via.placeholder.com/150' }} 
          className="w-32 h-32 rounded-full border-4 border-blue-500" 
        />
        <Text className="text-2xl font-bold text-gray-800 mt-4">John Doe</Text>
        <Text className="text-lg text-gray-500">@johndoe</Text>
        <TouchableOpacity className="mt-4 bg-blue-500 py-2 px-6 rounded-2xl">
          <Text className="text-white text-base font-medium">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white mt-6 py-4 px-6 shadow-md rounded-2xl mx-4">
        <Text className="text-xl font-semibold text-gray-800 mb-4">About Me</Text>
        <Text className="text-base text-gray-600 leading-6">
          Software Developer passionate about creating user-friendly applications and exploring new technologies. Love hiking and photography in my free time.
        </Text>
      </View>

      <View className="bg-white mt-6 py-4 px-6 shadow-md rounded-2xl mx-4">
        <Text className="text-xl font-semibold text-gray-800 mb-4">Contact Information</Text>
        <View className="flex-row items-center mb-3">
          <Ionicons name="mail" size={20} color="#4B5563" />
          <Text className="ml-2 text-gray-700">john.doe@example.com</Text>
        </View>
        <View className="flex-row items-center mb-3">
          <Ionicons name="call" size={20} color="#4B5563" />
          <Text className="ml-2 text-gray-700">+1 234 567 890</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="location" size={20} color="#4B5563" />
          <Text className="ml-2 text-gray-700">San Francisco, CA</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;