import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, ThemeProvider } from "./ThemeContext";

import OverviewScreen from "./screens/OverviewScreen";
import PortfolioScreen from "./screens/PortfolioScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import HomeScreen from "./screens/HomeScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        id={undefined} // ✅ Setting id to avoid TS error
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "help";

            switch (route.name) {
              case "Overview":
                iconName = "analytics-outline";
                break;
              case "Portfolio":
                iconName = "briefcase-outline";
                break;
              case "Home":
                iconName = "home-outline";
                break;
              case "Profile":
                iconName = "person-outline";
                break;
              case "Settings":
                iconName = "settings-outline";
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            backgroundColor: isDarkMode ? "#1A2C3A" : "#FFFFFF",
            borderTopColor: isDarkMode ? "#0E1B27" : "#E5E5E5",
          },
          tabBarActiveTintColor: isDarkMode ? "#00D1D1" : "#1A2C3A",
          tabBarInactiveTintColor: isDarkMode ? "#8899A6" : "#555",
          headerStyle: {
            backgroundColor: isDarkMode ? "#1A2C3A" : "#FFFFFF",
          },
          headerTitleStyle: {
            color: isDarkMode ? "#FFFFFF" : "#1A2C3A",
          },
        })}
      >
        <Tab.Screen name="Overview" component={OverviewScreen} />
        <Tab.Screen name="Portfolio" component={PortfolioScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
