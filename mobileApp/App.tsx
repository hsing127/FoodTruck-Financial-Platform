import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import OverviewScreen from "./screens/OverviewScreen";
import PortfolioScreen from "./screens/PortfolioScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import HomeScreen from "./screens/HomeScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        id={undefined} // ✅ Setting id to avoid TS error
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = "help" as keyof typeof Ionicons.glyphMap;

            switch (route.name) {
              case "Overview":
                iconName = "analytics-outline";
                break;
              case "Portfolio":
                iconName = "briefcase-outline";
                break;
              case "Transactions":
                iconName = "swap-vertical-outline";
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
}
