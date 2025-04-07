import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "../ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";

const ForgotPasswordScreen: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { email: string }) => {
    Alert.alert("Password Reset", `A reset link has been sent to ${data.email}.`);
  };

  return (
    <View
      className={`flex-1 ${
        isDarkMode ? "bg-[#1A2C3A]" : "bg-gray-100"
      } justify-center p-5`}
    >
      <View
        className={`${
          isDarkMode ? "bg-[#0E1B27]" : "bg-white"
        } p-5 rounded-2xl shadow-lg`}
      >
        {/* Top Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
          <ArrowLeft color={isDarkMode ? "white" : "#1A2C3A"} size={24} />
        </TouchableOpacity>

        <Text
          className={`${
            isDarkMode ? "text-white" : "text-[#1A2C3A]"
          } text-2xl font-bold text-center mb-6`}
        >
          Forgot Password
        </Text>

        <Text
          className={`${
            isDarkMode ? "text-white" : "text-[#1A2C3A]"
          } text-base mb-2`}
        >
          Email
        </Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className={`${
                isDarkMode ? "bg-[#1F3545]" : "bg-white"
              } p-3 rounded-lg ${
                isDarkMode ? "text-white" : "text-[#1A2C3A]"
              } text-base mb-3`}
              placeholder="Enter your email"
              placeholderTextColor="#888"
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email?.message && (
          <Text className="text-red-500 text-sm mb-3">
            {String(errors.email.message)}
          </Text>
        )}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-teal-500 py-4 rounded-lg mt-5 items-center"
        >
          <Text className="text-white text-lg font-bold">Send Reset Link</Text>
        </TouchableOpacity>

        {/* Bottom Text Link */}
        <View className="flex-row justify-center mt-5">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-teal-500 text-sm">Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
