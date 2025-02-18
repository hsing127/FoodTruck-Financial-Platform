import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "../ThemeContext";

const LoginScreen: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const backgroundColor = isDarkMode ? "#1A2C3A" : "#F5F5F5";
  const cardBackground = isDarkMode ? "#0E1B27" : "#FFFFFF";
  const textColor = isDarkMode ? "#FFFFFF" : "#1A2C3A";
  const inputBackground = isDarkMode ? "#1F3545" : "#FFFFFF";
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { email: string; password: string }) => {
    Alert.alert("Login Successful", `Welcome, ${data.email}!`);
  };

  return (
    <View style={{ flex: 1, backgroundColor, justifyContent: "center", padding: 20 }}>
      <View style={{ backgroundColor: cardBackground, padding: 20, borderRadius: 10 }}>
        <Text style={{ color: textColor, fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Login
        </Text>
        
        {/* Email Input */}
        <Text style={{ color: textColor, marginBottom: 5 }}>Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={{ backgroundColor: inputBackground, padding: 10, borderRadius: 5, color: textColor }}
              placeholder="Enter your email"
              placeholderTextColor="#888"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && <Text style={{ color: "red", marginBottom: 10 }}>{errors.email.message}</Text>}
        
        {/* Password Input */}
        <Text style={{ color: textColor, marginBottom: 5, marginTop: 10 }}>Password</Text>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={{ backgroundColor: inputBackground, padding: 10, borderRadius: 5, color: textColor }}
              placeholder="Enter your password"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && <Text style={{ color: "red", marginBottom: 10 }}>{errors.password.message}</Text>}
        
        {/* Login Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={{ backgroundColor: "#00D1D1", padding: 12, borderRadius: 5, marginTop: 20, alignItems: "center" }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;