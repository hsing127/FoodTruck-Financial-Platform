import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "../ThemeContext";
import { useNavigation } from "@react-navigation/native";

const SignInScreen: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { email: string; password: string }) => {
    Alert.alert("Sign In Successful", `Welcome back, ${data.email}!`);
    navigation.replace("Main");
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
        <Text
          className={`${
            isDarkMode ? "text-white" : "text-[#1A2C3A]"
          } text-2xl font-bold text-center mb-6`}
        >
          Sign In
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
          rules={{ required: "Email is required" }}
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

        <Text
          className={`${
            isDarkMode ? "text-white" : "text-[#1A2C3A]"
          } text-base mb-2`}
        >
          Password
        </Text>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className={`${
                isDarkMode ? "bg-[#1F3545]" : "bg-white"
              } p-3 rounded-lg ${
                isDarkMode ? "text-white" : "text-[#1A2C3A]"
              } text-base mb-3`}
              placeholder="Enter your password"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password?.message && (
          <Text className="text-red-500 text-sm mb-3">
            {String(errors.password.message)}
          </Text>
        )}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-teal-500 py-4 rounded-lg mt-5 items-center"
        >
          <Text className="text-white text-lg font-bold">Sign In</Text>
        </TouchableOpacity>

        <View className="flex-row justify-between mt-5">
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text className="text-teal-500 text-sm">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="text-teal-500 text-sm">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;
