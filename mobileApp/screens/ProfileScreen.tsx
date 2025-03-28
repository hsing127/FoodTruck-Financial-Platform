import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from "react-native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import "../global.css";

const ContactItem = ({ icon, label }) => (
  <View className="flex-row items-center mb-3">
    {icon}
    <Text className="ml-2 text-gray-700 text-base">{label}</Text>
  </View>
);

const SocialLink = ({ iconName, platform, url }) => (
  <TouchableOpacity
    className="flex-row items-center mb-2"
    onPress={() => Linking.openURL(url)}
  >
    <FontAwesome name={iconName} size={20} color="#4B5563" />
    <Text className="ml-2 text-blue-600 text-base">{platform}</Text>
  </TouchableOpacity>
);

const ProfileScreen = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Profile Header */}
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

      {/* About Me */}
      <View className="bg-white mt-6 py-4 px-6 shadow-md rounded-2xl mx-4">
        <Text className="text-xl font-semibold text-gray-800 mb-4">About Me</Text>
        <Text className="text-base text-gray-600 leading-6">
          I'm a passionate Software Developer with experience in building responsive and user-friendly mobile and web applications.
          I enjoy solving complex problems, learning new technologies, and contributing to open-source projects. 
          In my spare time, you’ll find me hiking, experimenting with photography, or sipping coffee while reading.
        </Text>
      </View>

      {/* Contact Info */}
      <View className="bg-white mt-6 py-4 px-6 shadow-md rounded-2xl mx-4">
        <Text className="text-xl font-semibold text-gray-800 mb-4">Contact Information</Text>
        <ContactItem icon={<Ionicons name="mail" size={20} color="#4B5563" />} label="john.doe@example.com" />
        <ContactItem icon={<Ionicons name="call" size={20} color="#4B5563" />} label="+1 234 567 890" />
        <ContactItem icon={<Ionicons name="location" size={20} color="#4B5563" />} label="San Francisco, CA" />
      </View>

      {/* Social Links */}
      <View className="bg-white mt-6 py-4 px-6 shadow-md rounded-2xl mx-4 mb-8">
        <Text className="text-xl font-semibold text-gray-800 mb-4">Social Profiles</Text>
        <SocialLink iconName="github" platform="GitHub" url="https://github.com/johndoe" />
        <SocialLink iconName="linkedin" platform="LinkedIn" url="https://linkedin.com/in/johndoe" />
        <SocialLink iconName="twitter" platform="Twitter" url="https://twitter.com/johndoe" />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
