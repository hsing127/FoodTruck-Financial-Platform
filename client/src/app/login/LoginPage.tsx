import "@/app/globals.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import FormLayout from "@/app/(components)/LoginComponents/formLayout";
import FormInput from "@/app/(components)/LoginComponents/formInput";
import SubmitButton from "@/app/(components)/LoginComponents/submitButton";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submission started");
  
    if (!email || !password) {
      console.log("Missing email or password");
      alert("Please enter both email and password.");
      return;
    }
    
    console.log("Attempting to send login request");
  
    try {

        console.log(
            {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  body: JSON.stringify({ email, password }),
                }),
    });

        const response = await fetch("https://frih5a7ugg.execute-api.ca-central-1.amazonaws.com/dev/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: JSON.stringify({ email, password }),
          }),
        });
      
      
      console.log(
      {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
      );
      console.log(JSON.stringify({ email, password }));
      console.log("Received response from server");
      console.log(response);

      if (!response.ok) {
        console.log("Login failed, response not ok");
        const errorData = await response.json();
        console.log("Error data:", errorData);
        alert(errorData.error || "Failed to log in");
        return;
      }
  
      const data = await response.json();
      console.log("Login successful:", data.message);
  
      // Redirect to the dashboard on successful login
      console.log("Redirecting to dashboard");
      router.push("/dashboard/home");
  
    } catch (error) {
      console.error("An error occurred in handleSubmit:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  

  return (
    <FormLayout title="Login" description="Enter your login details below.">
      <form onSubmit={handleSubmit}>
        <FormInput type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              className="w-4 h-4 text-[#8B5CF6] focus:ring-[#8B5CF6] rounded border-gray-300 bg-gray-700 focus:ring-2"
            />
            <label htmlFor="remember-me" className="ml-2 text-customWhite">
              Remember Me
            </label>
          </div>
          <Link href="/login/forgotpassword" className="text-[#8B5CF6] hover:underline">
            Forgot Password?
          </Link>
        </div>
        <SubmitButton text="Login" />
      </form>
      <p className="text-customWhite text-center mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/login/signup" className="text-[#8B5CF6] hover:underline">
          Sign Up
        </Link>
      </p>
    </FormLayout>
  );
};

export default LoginPage;
