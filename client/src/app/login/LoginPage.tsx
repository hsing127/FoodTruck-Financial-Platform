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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      router.push("/dashboard/finance");
    } else {
      alert("Please enter both email and password.");
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
