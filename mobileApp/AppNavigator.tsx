import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./ThemeContext";

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

const MainTabNavigator = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Overview: "analytics-outline",
            Portfolio: "briefcase-outline",
            Home: "home-outline",
            Profile: "person-outline",
            Settings: "settings-outline",
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#1A2C3A" : "#FFFFFF",
          borderTopColor: isDarkMode ? "#0E1B27" : "#E5E5E5",
        },
        tabBarActiveTintColor: isDarkMode ? "#00D1D1" : "#1A2C3A",
        tabBarInactiveTintColor: isDarkMode ? "#8899A6" : "#555",
        headerStyle: { backgroundColor: isDarkMode ? "#1A2C3A" : "#FFFFFF" },
        headerTitleStyle: { color: isDarkMode ? "#FFFFFF" : "#1A2C3A" },
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

const AppNavigator = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="SignIn" id={undefined} screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;