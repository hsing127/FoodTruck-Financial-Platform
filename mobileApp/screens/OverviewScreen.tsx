import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  BarChart,
  LineChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import "../global.css";

const screenWidth = Dimensions.get("window").width;

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
        <Text className="text-lg text-gray-600 mt-2">
          A detailed summary of your activities and performance
        </Text>
      </View>

      <View className="px-4">
        <View className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Monthly Performance
          </Text>
          <BarChart
            data={data}
            width={screenWidth - 32}
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        </View>

        <View className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Activity Trend
          </Text>
          <LineChart
            data={data}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
          />
        </View>

        <View className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Task Distribution
          </Text>
          <PieChart
            data={pieData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </View>

        <View className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Progress Overview
          </Text>
          <ProgressChart
            data={progressData}
            width={screenWidth - 32}
            height={200}
            chartConfig={chartConfig}
          />
        </View>

        <View className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </Text>
          <TouchableOpacity className="bg-blue-500 rounded-2xl p-3 mb-3 flex-row items-center justify-center">
            <Ionicons
              name="document-text-outline"
              size={20}
              color="white"
              className="mr-2"
            />
            <Text className="text-white text-lg font-medium">View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-green-500 rounded-2xl p-3 mb-3 flex-row items-center justify-center">
            <Ionicons
              name="analytics-outline"
              size={20}
              color="white"
              className="mr-2"
            />
            <Text className="text-white text-lg font-medium">
              Generate Report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-red-500 rounded-2xl p-3 flex-row items-center justify-center">
            <Ionicons
              name="warning-outline"
              size={20}
              color="white"
              className="mr-2"
            />
            <Text className="text-white text-lg font-medium">
              Resolve Issues
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default OverviewScreen;
