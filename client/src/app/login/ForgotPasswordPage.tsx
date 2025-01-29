import "@/app/globals.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import FormLayout from "@/app/(components)/LoginComponents/formLayout";
import FormInput from "@/app/(components)/LoginComponents/formInput";
import SubmitButton from "@/app/(components)/LoginComponents/submitButton";
import Link from "next/link";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null); // Added error state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error state on new submit

    if (email.trim()) {
      try {
        // Make the API call to send the email
        const response = await fetch(
          "https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/auth/forgot-password/send-code",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to send reset email");
        }

        const data = await response.json();
        const statusCode = data.statusCode;

        if (statusCode === 200) {
          // Redirect if the email was sent successfully
          router.push("/login/forgotpasswordcode");
        } else {
          setError("Invalid email");
        }
      } catch (error: any) {
        setError(
          error.message ||
            "There was an error sending the email. Please try again."
        );
        console.error("Error:", error);
      }
    } else {
      setError("Please enter the email before submitting.");
    }
  };

  return (
    <FormLayout
      title="Forgot Your Password?"
      description="Enter your email address and we will send you instructions to reset your password."
    >
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
        <FormInput
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <div className="mb-4 text-customRed text-sm">{error}</div>}
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
