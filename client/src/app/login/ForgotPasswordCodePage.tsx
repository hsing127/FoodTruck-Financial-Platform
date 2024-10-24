import React, { useState } from "react";
import "@/app/globals.css";

const ForgotPasswordCodePage: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState<string>("");

  const resendCode = () => {
    alert("A new recovery code has been sent to your email.");
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (verificationCode.trim()) {
      window.location.href = "/forgotpasswordnew";
    } else {
      alert("Please enter the verification code before submitting.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-fixed bg-center bg-gray-950">
      <div className="bg-customWhite/5 backdrop-blur-lg rounded-xl shadow-lg p-10 max-w-md w-full mx-auto">
        <h2 className="text-customWhite text-2xl text-center mb-10">
          Account Verification
        </h2>
        <p className="text-customWhite text-center mb-6">
          A verification code has been sent to your email. Please provide the
          code to verify.
        </p>
        <form>
          <div className="relative mb-8">
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              placeholder="Verification Code"
              required
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full text-customWhite bg-transparent border-b-2 border-customWhite outline-none py-4 focus:border-[#8B5CF6] transition-all placeholder-customWhite"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#8B5CF6] text-customWhite font-bold py-4 rounded-full transition-all hover:bg-[#7B49E2]"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <p className="text-customWhite text-center mt-4">
            Didn&apos;t receive a code?{" "}
            <span
              onClick={resendCode}
              className="text-[#8B5CF6] hover:underline cursor-pointer"
            >
              Resend
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordCodePage;
