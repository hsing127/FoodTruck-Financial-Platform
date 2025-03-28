import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "../ThemeContext";

const LoginScreen: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const backgroundColor = isDarkMode ? "bg-[#1A2C3A]" : "bg-gray-100";
  const cardBackground = isDarkMode ? "bg-[#0E1B27]" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-[#1A2C3A]";
  const inputBackground = isDarkMode ? "bg-[#1F3545]" : "bg-white";

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data: { email: string; password: string }) => {
    Alert.alert("Login Successful", `Welcome, ${data.email}!`);
  };

  return (
    <View className={`flex-1 ${backgroundColor} justify-center p-5`}>
      <View className={`${cardBackground} p-5 rounded-2xl shadow-lg`}>
        <Text className={`${textColor} text-2xl font-bold text-center mb-6`} accessibilityRole="header">
          Login
        </Text>

        {/* Email Input */}
        <Text className={`${textColor} text-base mb-2`}>Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{ 
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format"
            }
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
              accessibilityLabel="Email input"
            />
          )}
        />
        {errors.email?.message && (
          <Text className="text-red-500 text-sm mb-3" accessibilityLiveRegion="polite">
            {String(errors.email.message)}
          </Text>
        )}

        {/* Password Input */}
        <Text className={`${textColor} text-base mb-2`}>Password</Text>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className={`${inputBackground} p-3 rounded-lg ${textColor} text-base mb-3`}
              placeholder="Enter your password"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              accessibilityLabel="Password input"
            />
          )}
        />
        {errors.password?.message && (
          <Text className="text-red-500 text-sm mb-3" accessibilityLiveRegion="polite">
            {String(errors.password.message)}
          </Text>
        )}

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className={`bg-teal-500 py-4 rounded-lg mt-5 items-center ${isSubmitting ? 'opacity-50' : ''}`}
          disabled={isSubmitting}
          accessibilityRole="button"
        >
          <Text className="text-white text-lg font-bold">{isSubmitting ? "Logging in..." : "Login"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
