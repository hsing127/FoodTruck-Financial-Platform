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
import { useTheme } from "../ThemeContext";

const { width } = Dimensions.get("window");

const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const backgroundColor = isDarkMode ? "#1A2C3A" : "#F5F5F5";
  const cardBackground = isDarkMode ? "#0E1B27" : "#FFFFFF";
  const textColor = isDarkMode ? "#FFFFFF" : "#1A2C3A";
  const subTextColor = isDarkMode ? "#8899A6" : "#555";

  const chartConfig = {
    backgroundColor,
    backgroundGradientFrom: backgroundColor,
    backgroundGradientTo: backgroundColor,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 209, 209, ${opacity})`,
    labelColor: () => textColor,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#00D1D1",
    },
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
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
              <Text
                style={{ color: textColor }}
                className="text-base font-semibold"
              >
                John Morgan
              </Text>
              <Text style={{ color: subTextColor }} className="text-xs">
                Sales Manager
              </Text>
            </View>
          </View>
          <TouchableOpacity className="p-2">
            <Menu color={textColor} size={26} />
          </TouchableOpacity>
        </View>

        {/* Balance / Stats Card */}
        <View
          style={{ backgroundColor: cardBackground }}
          className="mx-5 rounded-xl p-5 mb-4"
        >
          <Text className="text-3xl font-bold" style={{ color: "#00D1D1" }}>
            $267,345
          </Text>
          <View className="flex-row mt-3">
            <View className="mr-5">
              <Text
                style={{ color: textColor }}
                className="text-base font-semibold"
              >
                $34,345
              </Text>
              <Text style={{ color: subTextColor }} className="text-xs">
                Expenses
              </Text>
            </View>
            <View>
              <Text
                style={{ color: textColor }}
                className="text-base font-semibold"
              >
                $17,345
              </Text>
              <Text style={{ color: subTextColor }} className="text-xs">
                Profit
              </Text>
            </View>
          </View>
        </View>

        {/* Chart Section */}
        <View
          style={{ backgroundColor: cardBackground }}
          className="items-center mx-5 rounded-xl py-5 mb-4"
        >
          <LineChart
            data={{
              labels: ["Apr", "Jun", "Aug", "Oct", "Dec", "Feb"],
              datasets: [
                {
                  data: [2700, 3450, 2100, 3850, 3150, 3306],
                  color: () => "#00D1D1",
                },
              ],
            }}
            width={width * 0.9}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 10 }}
          />
          <View className="mt-2">
            <Text
              className="text-base font-semibold"
              style={{ color: "#00D1D1" }}
            >
              Last Transaction: $3,306
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
