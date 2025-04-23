import React from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./ThemeContext";
import * as ImagePicker from "expo-image-picker";

// Screens
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignupScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import OverviewScreen from "./screens/OverviewScreen";
import PortfolioScreen from "./screens/PortfolioScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// === Theme Toggle Button ===
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 10 }}>
      {isDarkMode ? (
        <Ionicons name="sunny-outline" size={24} color="#FFD700" />
      ) : (
        <Ionicons name="moon-outline" size={24} color="#1A2C3A" />
      )}
    </TouchableOpacity>
  );
};

// === Upload Button (like receipt upload) ===
const UploadButton = () => {
  const [_, setUploadedReceipt] = React.useState<string | null>(null);
  const { theme } = useTheme(); // Grab theme from context
  const isDarkMode = theme === "dark";

  const handleUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "Please allow access to media library.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setUploadedReceipt(uri);
      Alert.alert("Upload Successful", "Receipt image uploaded!");
    }
  };

  return (
    <TouchableOpacity onPress={handleUpload} style={{ marginRight: 10 }}>
      <Ionicons
        name="arrow-up-outline"
        size={24}
        color={isDarkMode ? "#FFD700" : "#1A2C3A"}
      />
    </TouchableOpacity>
  );
};


// === Main Tab Navigation ===
const MainTabNavigator = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <Tab.Navigator
      id={null}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Overview: "analytics-outline",
            Portfolio: "briefcase-outline",
            Home: "home-outline",
            Profile: "person-outline",
            Settings: "settings-outline",
          };
          return (
            <Ionicons name={icons[route.name]} size={size} color={color} />
          );
        },
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#1A2C3A" : "#FFFFFF",
          borderTopColor: isDarkMode ? "#0E1B27" : "#E5E5E5",
        },
        tabBarActiveTintColor: isDarkMode ? "#00D1D1" : "#1A2C3A",
        tabBarInactiveTintColor: isDarkMode ? "#8899A6" : "#555",
        headerStyle: { backgroundColor: isDarkMode ? "#1A2C3A" : "#FFFFFF" },
        headerTitleStyle: { color: isDarkMode ? "#FFFFFF" : "#1A2C3A" },
        headerRight: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <UploadButton />
            <ThemeToggle />
          </View>
        ),
      })}
    >
      <Tab.Screen name="Overview" component={OverviewScreen} />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

// === App Root Stack ===
const AppNavigator = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName="SignIn"
        id={undefined}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
