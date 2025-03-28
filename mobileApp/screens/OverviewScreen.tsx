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

const pieData = [
  {
    name: "Completed",
    population: 40,
    color: "#28a745",
    legendFontColor: "#000",
    legendFontSize: 14,
  },
  {
    name: "Pending",
    population: 30,
    color: "#ffc107",
    legendFontColor: "#000",
    legendFontSize: 14,
  },
  {
    name: "Overdue",
    population: 15,
    color: "#dc3545",
    legendFontColor: "#000",
    legendFontSize: 14,
  },
  {
    name: "In Progress",
    population: 15,
    color: "#007bff",
    legendFontColor: "#000",
    legendFontSize: 14,
  },
];

const progressData = {
  labels: ["Sales", "Growth", "Revenue"],
  data: [0.7, 0.8, 0.6],
};

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(33, 37, 41, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(108, 117, 125, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

const OverviewScreen = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="items-center py-6">
        <Text className="text-3xl font-bold text-blue-600">
          Overview Dashboard
        </Text>
        <Text className="text-base text-gray-600 mt-1">
          Performance Summary - {currentMonth} {currentYear}
        </Text>
        <Text className="text-sm text-gray-500 mt-1">
          Review your KPIs and quick actions
        </Text>
      </View>

      <View className="px-4">
        {/* Monthly Performance */}
        <View className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-2">
            Monthly Performance
          </Text>
          <Text className="text-sm text-gray-500 mb-4">
            Track your income across the last 6 months
          </Text>
          <BarChart
            data={data}
            width={screenWidth - 32}
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            fromZero
          />
        </View>

        {/* Activity Trend */}
        <View className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-2">
            Activity Trend
          </Text>
          <Text className="text-sm text-gray-500 mb-4">
            Observe fluctuations and growth patterns
          </Text>
          <LineChart
            data={data}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            fromZero
          />
        </View>

        {/* Task Distribution */}
        <View className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-2">
            Task Distribution
          </Text>
          <Text className="text-sm text-gray-500 mb-4">
            Breakdown of current task statuses
          </Text>
          <PieChart
            data={pieData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            hasLegend={true}
          />
        </View>

        {/* Progress Overview */}
        <View className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-2">
            Progress Overview
          </Text>
          <Text className="text-sm text-gray-500 mb-4">
            Visualize your progress across metrics
          </Text>
          <ProgressChart
            data={progressData}
            width={screenWidth - 32}
            height={200}
            chartConfig={chartConfig}
          />
        </View>

        {/* Quick Actions */}
        <View className="bg-white rounded-2xl shadow-md p-4 mb-10">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
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
                name={action.icon}
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

        {/* Footer */}
        <View className="items-center pb-6">
          <Text className="text-xs text-gray-400">
            © {currentYear} Dashboard Inc. All rights reserved.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OverviewScreen;
