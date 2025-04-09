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
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUpScreen: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);

  const backgroundColor = isDarkMode ? "bg-[#1A2C3A]" : "bg-gray-100";
  const cardBackground = isDarkMode ? "bg-[#0E1B27]" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-[#1A2C3A]";
  const inputBackground = isDarkMode ? "bg-[#1F3545]" : "bg-white";

  const onSubmit = (data: FormData) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Account Created", `Welcome, ${data.name}!`);
      navigation.replace("Main");
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
            {/* Back Arrow */}
            <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
              <ArrowLeft color={isDarkMode ? "white" : "#1A2C3A"} size={24} />
            </TouchableOpacity>

            <Text className={`${textColor} text-3xl font-bold text-center mb-6`}>
              Sign Up
            </Text>

            {/* Name */}
            <Text className={`${textColor} text-base mb-2`}>Full Name</Text>
            <Controller
              control={control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className={`${inputBackground} p-3 rounded-lg ${textColor} text-base mb-2`}
                  placeholder="Enter your name"
                  placeholderTextColor="#888"
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="words"
                />
              )}
            />
            {errors.name && (
              <Text className="text-red-500 text-sm mb-3">{errors.name.message}</Text>
            )}

            {/* Email */}
            <Text className={`${textColor} text-base mb-2`}>Email</Text>
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
                  className={`${inputBackground} p-3 rounded-lg ${textColor} text-base mb-2`}
                  placeholder="Enter your email"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500 text-sm mb-3">{errors.email.message}</Text>
            )}

            {/* Password */}
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
                  placeholder="Create a password"
                  placeholderTextColor="#888"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500 text-sm mb-3">
                {errors.password.message}
              </Text>
            )}

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              className={`bg-teal-500 py-4 rounded-lg mt-5 items-center ${
                loading ? "opacity-70" : ""
              }`}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-lg font-bold">Create Account</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
