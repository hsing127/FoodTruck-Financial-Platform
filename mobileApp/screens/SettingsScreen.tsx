import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Image,
} from "react-native";
import { useTheme } from "../ThemeContext";
import * as ImagePicker from "expo-image-picker";
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
import { useNavigation } from "@react-navigation/native";

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
        <Text
          className={`ml-3 text-base ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
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
  const navigation = useNavigation<any>();

  const isDarkMode = theme === "dark";
  const backgroundColor = isDarkMode ? "bg-gray-900" : "bg-gray-50";
  const cardBackground = isDarkMode ? "bg-gray-800" : "bg-white";

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);
  const [profileImage, setProfileImage] = React.useState<string | null>(null);
  const [receiptImage, setReceiptImage] = React.useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View className={`${backgroundColor} flex-1`}>
      <ScrollView showsVerticalScrollIndicator={false} className="px-5 pt-10">
        <Text
          className={`text-3xl font-bold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Settings
        </Text>
        <Text
          className={`text-base mb-6 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Customize your experience
        </Text>

        {/* === Profile === */}
        <View className={`${cardBackground} rounded-xl p-5 mb-5`}>
          <Text
            className={`text-lg font-semibold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
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

        {/* === Profile Photo Upload === */}
        <View className={`${cardBackground} rounded-xl p-5 mb-5`}>
          <Text
            className={`text-lg font-semibold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Profile Photo
          </Text>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              className="w-24 h-24 rounded-full mb-3"
            />
          ) : (
            <View className="w-24 h-24 rounded-full mb-3 bg-gray-300 items-center justify-center">
              <Text className="text-gray-600 text-sm">No Image</Text>
            </View>
          )}
          <TouchableOpacity onPress={pickImage}>
            <Text className="text-teal-500 text-sm">Upload Photo</Text>
          </TouchableOpacity>
        </View>

        {/* === Receipt Upload === */}
        <View className={`${cardBackground} rounded-xl p-5 mb-5`}>
          <Text
            className={`text-lg font-semibold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Photo of Receipt
          </Text>
          {receiptImage ? (
            <Image
              source={{ uri: receiptImage }}
              className="w-24 h-24 rounded-lg mb-3"
            />
          ) : (
            <View className="w-24 h-24 rounded-lg mb-3 bg-gray-300 items-center justify-center">
              <Text className="text-gray-600 text-sm">No Receipt Uploaded</Text>
            </View>
          )}
          <TouchableOpacity
            onPress={async () => {
              const permissionResult =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (!permissionResult.granted) {
                alert("Permission to access media library is required!");
                return;
              }

              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
              });

              if (!result.canceled) {
                setReceiptImage(result.assets[0].uri);
              }
            }}
          >
            <Text className="text-teal-500 text-sm">Upload Receipt</Text>
          </TouchableOpacity>
        </View>

        {/* === Preferences === */}
        <View className={`${cardBackground} rounded-xl p-5 mb-5`}>
          <Text
            className={`text-lg font-semibold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
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
          <Text
            className={`text-lg font-semibold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
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
          <Text
            className={`text-lg font-semibold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Appearance
          </Text>
          <TouchableOpacity
            onPress={toggleTheme}
            className="flex-row items-center py-2"
          >
            {isDarkMode ? (
              <Sun color="yellow" size={22} />
            ) : (
              <Moon color="black" size={22} />
            )}
            <Text
              className={`ml-3 text-base ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* === Subscription === */}
        <View className={`${cardBackground} rounded-xl p-5 mb-5`}>
          <Text
            className={`text-lg font-semibold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
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
          <Text
            className={`text-lg font-semibold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Help & About
          </Text>
          <SettingRow
            icon={Info}
            label="App Version"
            value="1.0.0"
            isDark={isDarkMode}
          />
          <SettingRow
            icon={HelpCircle}
            label="FAQ"
            onPress={() => {}}
            isDark={isDarkMode}
          />
          <TouchableOpacity className="flex-row items-center mt-3">
            <MessageSquare color={isDarkMode ? "white" : "black"} size={20} />
            <Text className="ml-3 text-teal-500 text-sm">Contact Support</Text>
          </TouchableOpacity>
        </View>

        {/* === Danger Zone === */}
        <View className={`${cardBackground} rounded-xl p-5 mb-5`}>
          <Text className={`text-lg font-semibold text-red-500`}>
            Danger Zone
          </Text>
          <TouchableOpacity className="flex-row items-center mt-4">
            <Trash2 color="red" size={22} />
            <Text className="ml-3 text-red-500 text-base">Delete Account</Text>
          </TouchableOpacity>
        </View>

        {/* === Logout === */}
        <TouchableOpacity
          className="flex-row items-center justify-center my-6"
          onPress={() => {
            // Clear any auth state here if needed
            navigation.replace("SignIn");
          }}
        >
          <LogOut color={isDarkMode ? "white" : "black"} size={22} />
          <Text
            className={`ml-2 text-base ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
