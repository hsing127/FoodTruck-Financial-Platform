import "@/app/globals.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import FormLayout from "@/app/(components)/LoginComponents/formLayout";
import FormInput from "@/app/(components)/LoginComponents/formInput";
import SubmitButton from "@/app/(components)/LoginComponents/submitButton";
import Link from "next/link";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      router.push("/login/forgotpasswordcode");
    } else {
      alert("Please enter the email before submitting.");
    }
  };

  return (
    <FormLayout
      title="Forgot Your Password?"
      description="Enter your email address and we will send you iinstructions to reset your password."
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SubmitButton text="Submit" />
      </form>
      <p className="text-customWhite text-center mt-4">
        <Link href="/login/login" className="text-[#8B5CF6] hover:underline">
          Back to Login
        </Link>
      </p>
    </FormLayout>
  );
};

export default ForgotPasswordPage;
