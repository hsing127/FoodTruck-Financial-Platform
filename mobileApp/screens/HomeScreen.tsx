import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

import { Menu } from "lucide-react-native";
import { LineChart } from "react-native-chart-kit";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  // Sample data for chart
  const chartData = {
    labels: ["Apr", "Jun", "Aug", "Oct", "Dec", "Feb"],
    datasets: [
      {
        data: [2700, 3450, 2100, 3850, 3150, 3306],
        color: () => "#00D1D1",
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#1A2C3A",
    backgroundGradientFrom: "#1A2C3A",
    backgroundGradientTo: "#1A2C3A",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 209, 209, ${opacity})`,
    labelColor: () => "#FFFFFF",
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#00D1D1",
    },
  };

  return (
    <View className="flex-1 bg-[#1A2C3A]">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center pt-10 px-5 pb-5">
          {/* User Info */}
          <View className="flex-row items-center">
            <Image
              className="w-12 h-12 rounded-full"
              source={{
                uri: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
              }}
            />
            <View className="ml-3">
              <Text className="text-white text-base font-semibold">
                John Morgan
              </Text>
              <Text className="text-[#8899A6] text-xs">Sales Manager</Text>
            </View>
          </View>
          {/* Menu Button */}
          <TouchableOpacity className="p-2">
            <Menu color="#ffffff" size={26} />
          </TouchableOpacity>
        </View>

        {/* Balance / Stats Card */}
        <View className="mx-5 bg-[#0E1B27] rounded-xl p-5 mb-4">
          <Text className="text-[#00D1D1] text-3xl font-bold">$267,345</Text>
          {/* Sub stats row */}
          <View className="flex-row mt-3">
            <View className="mr-5">
              <Text className="text-white text-base font-semibold">
                $34,345
              </Text>
              <Text className="text-[#8899A6] text-xs">Expenses</Text>
            </View>
            <View>
              <Text className="text-white text-base font-semibold">
                $17,345
              </Text>
              <Text className="text-[#8899A6] text-xs">Profit</Text>
            </View>
          </View>
        </View>

        {/* Chart Section */}
        <View className="items-center bg-[#0E1B27] mx-5 rounded-xl py-5 mb-4">
          <LineChart
            data={chartData}
            width={width * 0.9}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 10 }}
          />
          <View className="mt-2">
            <Text className="text-[#00D1D1] text-base font-semibold">
              Last Transaction: $3,306
            </Text>
          </View>
        </View>

        {/* Info Cards */}
        <View className="flex-row flex-wrap justify-between mx-5">
          <View className="w-[48%] bg-[#0E1B27] rounded-xl p-4 mb-4">
            <Text className="text-[#00D1D1] font-semibold text-sm">
              Inventory
            </Text>
            <Text className="text-white text-xs mt-1">Stock: 2,400</Text>
          </View>

          <View className="w-[48%] bg-[#0E1B27] rounded-xl p-4 mb-4">
            <Text className="text-[#00D1D1] font-semibold text-sm">Sales</Text>
            <Text className="text-white text-xs mt-1">Week: $12,300</Text>
          </View>

          <View className="w-[48%] bg-[#0E1B27] rounded-xl p-4 mb-4">
            <Text className="text-[#00D1D1] font-semibold text-sm">
              Shipped
            </Text>
            <Text className="text-white text-xs mt-1">Today: 158</Text>
          </View>

          <View className="w-[48%] bg-[#0E1B27] rounded-xl p-4 mb-4">
            <Text className="text-[#00D1D1] font-semibold text-sm">
              Refunds
            </Text>
            <Text className="text-white text-xs mt-1">This Month: $220</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
