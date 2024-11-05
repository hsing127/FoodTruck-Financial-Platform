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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      try {
        //Make the API call to send the email
        const response = await fetch("https://frih5a7ugg.execute-api.ca-central-1.amazonaws.com/dev/auth/forgot-password/send-code", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        console.log(JSON.stringify({response}));

        if (!response.ok) {
          throw new Error("Failed to send reset email");
        }

        //Redirect if the email was sent successfully
        router.push("/login/forgotpasswordcode");
      } catch (error) {
        alert("There was an error sending the email. Please try again.");
        console.error("Error:", error);
      }
    } else {
      alert("Please enter the email before submitting.");
    }
  };

  return (
    <FormLayout
      title="Forgot Your Password?"
      description="Enter your email address and we will send you instructions to reset your password."
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
