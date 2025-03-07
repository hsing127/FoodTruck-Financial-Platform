import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
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

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(33, 37, 41, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(108, 117, 125, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#007bff",
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
          A summary of your recent activity
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
            Quick Actions
          </Text>
          <TouchableOpacity className="bg-blue-500 rounded-2xl p-3 mb-3 items-center">
            <Text className="text-white text-lg font-medium">View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-green-500 rounded-2xl p-3 items-center">
            <Text className="text-white text-lg font-medium">
              Generate Report
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default OverviewScreen;
