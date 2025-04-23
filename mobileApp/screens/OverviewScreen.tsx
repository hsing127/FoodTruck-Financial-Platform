import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import {
  BarChart,
  LineChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../ThemeContext";
import "../global.css";

const screenWidth = Dimensions.get("window").width;
const currentMonth = new Date().toLocaleString("default", { month: "long" });
const currentYear = new Date().getFullYear();

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const progressData = {
  labels: ["Sales", "Growth", "Revenue"],
  data: [0.7, 0.8, 0.6],
};

const OverviewScreen = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const backgroundColor = isDarkMode ? "bg-gray-900" : "bg-gray-100";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const cardBackground = isDarkMode ? "bg-gray-800" : "bg-white";

  const chartConfig = {
    backgroundGradientFrom: isDarkMode ? "#1F2937" : "#ffffff",
    backgroundGradientTo: isDarkMode ? "#1F2937" : "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) =>
      isDarkMode
        ? `rgba(255, 255, 255, ${opacity})`
        : `rgba(33, 37, 41, ${opacity})`,
    labelColor: (opacity = 1) =>
      isDarkMode
        ? `rgba(255, 255, 255, ${opacity})`
        : `rgba(108, 117, 125, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const legendFontColor = (opacity = 1) =>
    isDarkMode
      ? `rgba(255, 255, 255, ${opacity})`
      : `rgba(108, 117, 125, ${opacity})`;

  const pieData = [
    {
      name: "Completed",
      population: 40,
      color: "#28a745",
      legendFontColor: legendFontColor(1),
      legendFontSize: 14,
    },
    {
      name: "Pending",
      population: 30,
      color: "#ffc107",
      legendFontColor: legendFontColor(1),
      legendFontSize: 14,
    },
    {
      name: "Overdue",
      population: 15,
      color: "#dc3545",
      legendFontColor: legendFontColor(1),
      legendFontSize: 14,
    },
    {
      name: "In Progress",
      population: 15,
      color: "#007bff",
      legendFontColor: legendFontColor(1),
      legendFontSize: 14,
    },
  ];

  return (
    <ScrollView className={`flex-1 ${backgroundColor}`}>
      <View className="items-center py-6">
        <Text className="text-3xl font-bold text-blue-600">
          Overview Dashboard
        </Text>
        <Text className={`${textColor} text-base mt-1`}>
          Performance Summary - {currentMonth} {currentYear}
        </Text>
        <Text className="text-sm text-gray-500 mt-1">
          Review your KPIs and quick actions
        </Text>
      </View>

      <View className="px-4">
        {/* Monthly Performance */}
        <View className={`${cardBackground} rounded-2xl shadow-md p-4 mb-6`}>
          <Text className={`${textColor} text-xl font-semibold mb-2`}>
            Monthly Performance
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <BarChart
              data={data}
              width={screenWidth * 1.5}
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              chartConfig={chartConfig}
              fromZero
            />
          </ScrollView>
        </View>

        {/* Activity Trend */}
        <View className={`${cardBackground} rounded-2xl shadow-md p-4 mb-6`}>
          <Text className={`${textColor} text-xl font-semibold mb-2`}>
            Activity Trend
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={data}
              width={screenWidth * 1.5}
              height={220}
              chartConfig={chartConfig}
              bezier
              fromZero
            />
          </ScrollView>
        </View>

        {/* Task Distribution */}
        <View className={`${cardBackground} rounded-2xl shadow-md p-4 mb-6`}>
          <Text className={`${textColor} text-xl font-semibold mb-2`}>
            Task Distribution
          </Text>
          <PieChart
            data={pieData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="0"
            hasLegend={true}
          />
        </View>

        {/* Progress Overview */}
        <View className={`${cardBackground} rounded-2xl shadow-md p-4 mb-6`}>
          <Text className={`${textColor} text-xl font-semibold mb-2`}>
            Progress Overview
          </Text>
          <ProgressChart
            data={progressData}
            width={screenWidth - 64}
            height={200}
            chartConfig={chartConfig}
          />
        </View>

        {/* Quick Actions */}
        <View className={`${cardBackground} rounded-2xl shadow-md p-4 mb-10`}>
          <Text className={`${textColor} text-xl font-semibold mb-4`}>
            Quick Actions
          </Text>
          {[
            {
              label: "View Details",
              icon: "document-text-outline",
              color: "bg-blue-500",
            },
            {
              label: "Generate Report",
              icon: "analytics-outline",
              color: "bg-green-500",
            },
            {
              label: "Resolve Issues",
              icon: "warning-outline",
              color: "bg-red-500",
            },
          ].map((action, index) => (
            <TouchableOpacity
              key={index}
              className={`${action.color} rounded-2xl p-3 mb-3 flex-row items-center justify-center`}
              activeOpacity={0.8}
            >
              <Ionicons
                name={action.icon as keyof typeof Ionicons.glyphMap}
                size={20}
                color="white"
                className="mr-2"
              />
              <Text className="text-white text-lg font-medium">
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default OverviewScreen;
