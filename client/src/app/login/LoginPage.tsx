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
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch(
        "https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      const statusCode = data.statusCode || response.status;

      // Redirect on successful login; otherwise, show error message
      if (statusCode === 200) {
        setErrorMessage("");
        router.push("/dashboard/home");
      } else {
        setErrorMessage("Invalid username or password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <FormLayout title="Login" description="Enter your login details below.">
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              className="w-4 h-4  rounded border-gray-300 bg-gray-700"
            />
            <label htmlFor="remember-me" className="ml-2 text-customWhite">
              Remember Me
            </label>
          </div>
          <Link
            href="/login/forgotpassword"
            className="text-[#8B5CF6] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {errorMessage && (
          <div className="text-customRed text-sm mb-4">{errorMessage}</div>
        )}

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
