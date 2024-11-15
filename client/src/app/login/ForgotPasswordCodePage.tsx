import "@/app/globals.css";
import React, { useState } from "react";
import FormLayout from "@/app/(components)/LoginComponents/formLayout";
import FormInput from "@/app/(components)/LoginComponents/formInput";
import SubmitButton from "@/app/(components)/LoginComponents/submitButton";
import router from "next/router";

const ForgotPasswordCodePage: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(verificationCode.trim()) {
      try {
      const response = await fetch("https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/auth/forgot-password/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({verificationCode}),
      });
      if (!response.ok) {
        throw new Error("Failed to send reset code");
      }

      const data = await response.json();
      const statusCode = data.statusCode;
      // console.log(JSON.stringify({data}));

      if(statusCode === 200) {
        //Redirect if the code was verified successfully
        router.push("/login/forgotpasswordcode");
      } else {
        alert("Invalid code");
      }
    } catch (error) {
        alert("There was an error sending the code. Please try again.");
        console.error("Error:", error);
    }
    } else {
      alert("Please enter the verification code.");
    }
  };

  const handleResendCode = () => {
    alert("A new recovery code has been sent to your email.");
  };

  return (
    <FormLayout
      title="Account Verification"
      description="A verification code has been sent to your email. Please enter the code to verify."
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="verificationCode"
          placeholder="Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <SubmitButton text="Submit" />
      </form>
      <p className="text-customWhite text-center mt-4">
        Didn&apos;t receive a code?{" "}
        <span
          onClick={handleResendCode}
          className="text-[#8B5CF6] hover:underline cursor-pointer"
        >
          Resend
        </span>
      </p>
    </FormLayout>
  );
};

export default ForgotPasswordCodePage;
