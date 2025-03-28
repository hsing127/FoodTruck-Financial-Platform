import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "../ThemeContext";

interface FormData {
  email: string;
  password: string;
}

const SignInScreen: React.FC = () => {
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
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: FormData) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Sign In Successful", `Welcome back, ${data.email}!`);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className={`flex-1 ${backgroundColor}`}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center p-5">
          <View className={`${cardBackground} p-6 rounded-2xl shadow-lg`}>
            <Text className={`${textColor} text-3xl font-bold text-center mb-6`}>
              Sign In
            </Text>

            {/* Email Input */}
            <Text className={`${textColor} text-base mb-2`}>Email</Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`${inputBackground} p-3 rounded-lg ${textColor} text-base mb-2`}
                  placeholder="Enter your email"
                  placeholderTextColor="#888"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoFocus
                  accessibilityLabel="Email input"
                  returnKeyType="next"
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500 text-sm mb-3">
                {errors.email.message}
              </Text>
            )}

            {/* Password Input */}
            <Text className={`${textColor} text-base mb-2`}>Password</Text>
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`${inputBackground} p-3 rounded-lg ${textColor} text-base mb-2`}
                  placeholder="Enter your password"
                  placeholderTextColor="#888"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  accessibilityLabel="Password input"
                  returnKeyType="done"
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500 text-sm mb-3">
                {errors.password.message}
              </Text>
            )}

            {/* Sign In Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              className={`bg-teal-500 py-4 rounded-lg mt-5 items-center ${
                loading ? "opacity-70" : ""
              }`}
              accessibilityLabel="Sign In button"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-lg font-bold">Sign In</Text>
              )}
            </TouchableOpacity>

            {/* Footer Links */}
            <View className="flex-row justify-between mt-5">
              <TouchableOpacity>
                <Text className="text-teal-500 text-sm">Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="text-teal-500 text-sm">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
