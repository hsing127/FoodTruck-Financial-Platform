import "@/app/globals.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import FormLayout from "@/app/(components)/LoginComponents/formLayout";
import FormInput from "@/app/(components)/LoginComponents/formInput";
import SubmitButton from "@/app/(components)/LoginComponents/submitButton";

const ForgotPasswordCodePage: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState<string | null>(null); // Added error state
  const [loading, setLoading] = useState(false); // Added loading state
  const router = useRouter(); // Initialized router

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error state on new submit

    if (verificationCode.trim()) {
      setLoading(true); // Start loading

      try {
        const response = await fetch(
          "https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/auth/forgot-password/verify-code",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ verificationCode }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to verify reset code");
        }

        const data = await response.json();
        const statusCode = data.statusCode;

        if (statusCode === 200) {
          // Redirect if the code was verified successfully
          // Note: Ensure that the redirection path is correct.
          router.push("/login/reset-password"); // Example redirection
        } else {
          setError("Invalid verification code");
        }
      } catch (error: any) {
        setError(
          error.message ||
            "There was an error verifying the code. Please try again."
        );
        console.error("Error:", error);
      } finally {
        setLoading(false); // End loading
      }
    } else {
      setError("Please enter the verification code.");
    }
  };

  return (
    <FormLayout
      title="Account Verification"
      description="A verification code has been sent to your email. Please enter the code to verify."
    >
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
        <FormInput
          type="text"
          name="verificationCode"
          placeholder="Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        {error && <div className="mb-4 text-customRed text-sm">{error}</div>}
        <SubmitButton text={loading ? "Submitting..." : "Submit"} />
      </form>
      <p className="text-customWhite text-center mt-4">
        Didn&apos;t receive a code?{" "}
        <span
          className={`text-[#8B5CF6] hover:underline cursor-pointer ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Resend
        </span>
      </p>
    </FormLayout>
  );
};

export default ForgotPasswordCodePage;
