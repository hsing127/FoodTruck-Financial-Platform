import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "../ThemeContext";

const ForgotPasswordScreen: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const backgroundColor = isDarkMode ? "bg-[#1A2C3A]" : "bg-gray-100";
  const cardBackground = isDarkMode ? "bg-[#0E1B27]" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-[#1A2C3A]";
  const inputBackground = isDarkMode ? "bg-[#1F3545]" : "bg-white";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { email: string }) => {
    Alert.alert(
      "Password Reset",
      `A password reset link has been sent to ${data.email}.`
    );
  };

  return (
    <View className={`flex-1 ${backgroundColor} justify-center p-5`}>
      <View className={`${cardBackground} p-5 rounded-2xl shadow-lg`}>
        <Text className={`${textColor} text-2xl font-bold text-center mb-6`}>
          Forgot Password
        </Text>

        <Text className={`${textColor} text-base mb-2`}>Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className={`${inputBackground} p-3 rounded-lg ${textColor} text-base mb-3`}
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

        <View className="flex-row justify-center mt-5">
          <TouchableOpacity>
            <Text className="text-teal-500 text-sm">Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
