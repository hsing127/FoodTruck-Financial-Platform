import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { Menu, RefreshCcw } from "lucide-react-native";
import { LineChart } from "react-native-chart-kit";
import { useTheme } from "../ThemeContext";

const { width } = Dimensions.get("window");

const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Define theme-specific colors
  const backgroundColor = isDarkMode ? "#111827" : "#F9FAFB";
  const cardBackground = isDarkMode ? "#1F2937" : "#FFFFFF";
  const textColor = isDarkMode ? "#E5E7EB" : "#111827";
  const subTextColor = isDarkMode ? "#9CA3AF" : "#6B7280";

  // Chart configuration
  const chartConfig = {
    backgroundColor,
    backgroundGradientFrom: backgroundColor,
    backgroundGradientTo: backgroundColor,
    decimalPlaces: 0,
    color: (opacity = 1) =>
      isDarkMode
        ? `rgba(34, 211, 238, ${opacity})`
        : `rgba(0, 123, 255, ${opacity})`,
    labelColor: () => textColor,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: isDarkMode ? "#22D3EE" : "#007BFF",
    },
  };

  // Dummy data for recent transactions
  const transactionData = [
    {
      id: "1",
      description: "Office Supplies",
      amount: "-$150",
      date: "2025-03-31",
    },
    {
      id: "2",
      description: "Client Payment",
      amount: "+$2,500",
      date: "2025-03-30",
    },
    {
      id: "3",
      description: "Utility Bill",
      amount: "-$300",
      date: "2025-03-29",
    },
    {
      id: "4",
      description: "Software Subscription",
      amount: "-$50",
      date: "2025-03-28",
    },
  ];

  // Render each transaction item
  const renderTransaction = ({
    item,
  }: {
    item: (typeof transactionData)[0];
  }) => (
    <View
      style={{
        backgroundColor: cardBackground,
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ color: textColor, fontWeight: "600" }}>
          {item.description}
        </Text>
        <Text style={{ color: subTextColor, fontSize: 12 }}>{item.date}</Text>
      </View>
      <Text
        style={{
          color: item.amount.startsWith("+") ? "#22C55E" : "#EF4444",
          fontWeight: "600",
        }}
      >
        {item.amount}
      </Text>
    </View>
  );

  // Handle refresh logic (to be implemented)
  const handleRefresh = () => {
    console.log("Refreshing data...");
    // Add your refresh logic here
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center pt-10 px-5 pb-5">
          <View className="flex-row items-center">
            <Image
              className="w-12 h-12 rounded-full"
              source={{
                uri: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
              }}
            />
            <View className="ml-3">
              <Text
                style={{ color: textColor, fontSize: 16, fontWeight: "600" }}
              >
                John Morgan
              </Text>
              <Text style={{ color: subTextColor, fontSize: 12 }}>
                Sales Manager
              </Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity onPress={handleRefresh} className="p-2 mr-3">
              <RefreshCcw color={textColor} size={26} />
            </TouchableOpacity>
            <TouchableOpacity className="p-2">
              <Menu color={textColor} size={26} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Greeting Section */}
        <View className="px-5 mb-4">
          <Text style={{ color: textColor, fontSize: 22, fontWeight: "700" }}>
            Good Morning, John!
          </Text>
          <Text style={{ color: subTextColor, fontSize: 14 }}>
            Here's an overview of your latest activity
          </Text>
        </View>

        {/* Balance / Stats Card */}
        <View
          style={{ backgroundColor: cardBackground }}
          className="mx-5 rounded-xl p-5 mb-4 shadow"
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "700",
              color: isDarkMode ? "#22D3EE" : "#007BFF",
            }}
          >
            $267,345
          </Text>
          <View className="flex-row mt-3">
            <View className="mr-5">
              <Text
                style={{ color: textColor, fontSize: 16, fontWeight: "600" }}
              >
                $34,345
              </Text>
              <Text style={{ color: subTextColor, fontSize: 12 }}>
                Expenses
              </Text>
            </View>
            <View>
              <Text
                style={{ color: textColor, fontSize: 16, fontWeight: "600" }}
              >
                $17,345
              </Text>
              <Text style={{ color: subTextColor, fontSize: 12 }}>Profit</Text>
            </View>
          </View>
        </View>

        {/* Chart Section */}
        <View
          style={{ backgroundColor: cardBackground }}
          className="items-center mx-5 rounded-xl py-5 mb-4 shadow"
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={{
                labels: ["Apr", "Jun", "Aug", "Oct", "Dec", "Feb"],
                datasets: [
                  {
                    data: [2700, 3450, 2100, 3850, 3150, 3306],
                    color: () => (isDarkMode ? "#22D3EE" : "#007BFF"),
                  },
                ],
              }}
              width={width * 1.5}
              height={200}
              chartConfig={chartConfig}
              bezier
              style={{ borderRadius: 10, marginLeft: 10 }}
            />
          </ScrollView>
          <View className="mt-2">
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: isDarkMode ? "#22D3EE" : "#007BFF",
              }}
            >
              Last Transaction: $3,306
            </Text>
          </View>
        </View>

        {/* Recent Transactions Section */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              color: textColor,
              fontSize: 18,
              fontWeight: "700",
              marginBottom: 10,
            }}
          >
            Recent Transactions
          </Text>
          <FlatList
            data={transactionData}
            renderItem={renderTransaction}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
          <TouchableOpacity
            className="mt-3 p-3 rounded-lg"
            style={{
              backgroundColor: isDarkMode ? "#374151" : "#E5E7EB",
              alignItems: "center",
            }}
          >
            <Text style={{ color: textColor, fontSize: 14, fontWeight: "600" }}>
              View All Transactions
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
