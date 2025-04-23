import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { PieChart, LineChart } from "react-native-chart-kit";
import { useTheme } from "../ThemeContext";
import "../global.css";

const screenWidth = Dimensions.get("window").width;

const assetData = [
  { name: "Stocks", value: 45, color: "#007bff" },
  { name: "Bonds", value: 25, color: "#28a745" },
  { name: "Real Estate", value: 15, color: "#ffc107" },
  { name: "Crypto", value: 10, color: "#dc3545" },
  { name: "Cash", value: 5, color: "#6c757d" },
];

const performanceData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [2000, 2500, 2300, 2800, 3500, 4000],
      color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const PortfolioScreen = () => {
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
    style: { borderRadius: 16 },
    propsForDots: { r: "6", strokeWidth: "2", stroke: "#007bff" },
  };

  const pieChartData = assetData.map((item) => ({
    name: item.name,
    population: item.value,
    color: item.color,
    legendFontColor: isDarkMode ? "#ffffff" : "#111827",
    legendFontSize: 14,
  }));

  return (
    <ScrollView className={`flex-1 ${backgroundColor}`}>
      <View className="items-center py-6">
        <Text className="text-3xl font-bold text-blue-600">
          Portfolio Overview
        </Text>
        <Text className={`${textColor} text-lg mt-2`}>
          Your asset allocation & performance
        </Text>
      </View>

      <View className="px-4">
        {/* Asset Distribution */}
        <View className={`${cardBackground} rounded-2xl shadow-md p-4 mb-6`}>
          <Text className={`${textColor} text-xl font-semibold mb-4`}>
            Asset Distribution
          </Text>
          <PieChart
            data={pieChartData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

        {/* Performance Trend */}
        <View className={`${cardBackground} rounded-2xl shadow-md p-4 mb-6`}>
          <Text className={`${textColor} text-xl font-semibold mb-4`}>
            Performance Trend
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={performanceData}
              width={screenWidth * 1.5}
              height={220}
              chartConfig={chartConfig}
            />
          </ScrollView>
        </View>

        {/* Recent Transactions */}
        <View className={`${cardBackground} rounded-2xl shadow-md p-4 mb-6`}>
          <Text className={`${textColor} text-xl font-semibold mb-4`}>
            Recent Transactions
          </Text>
          {[
            { type: "Deposit", amount: "$1,000", date: "Feb 20, 2025" },
            { type: "Stock Purchase", amount: "$500", date: "Feb 18, 2025" },
            { type: "Crypto Investment", amount: "$300", date: "Feb 15, 2025" },
          ].map((transaction, index) => (
            <View key={index} className="flex-row justify-between mb-2">
              <Text className={`${textColor} font-medium`}>
                {transaction.type}
              </Text>
              <Text className={`${textColor} font-semibold`}>
                {transaction.amount}
              </Text>
              <Text className="text-gray-500">{transaction.date}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View className={`${cardBackground} rounded-2xl shadow-md p-4 mb-6`}>
          <Text className={`${textColor} text-xl font-semibold mb-4`}>
            Quick Actions
          </Text>
          <TouchableOpacity className="bg-blue-500 rounded-2xl p-3 mb-3 items-center">
            <Text className="text-white text-lg font-medium">Add Funds</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-green-500 rounded-2xl p-3 items-center">
            <Text className="text-white text-lg font-medium">Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PortfolioScreen;
