import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "@/app/globals.css";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email.trim()) {
      router.push("/forgotpasswordcode");
    } else {
      alert("Please enter the email before submitting.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-fixed bg-center bg-gray-950">
      <div className="bg-customWhite/5 backdrop-blur-lg rounded-xl shadow-lg p-10 max-w-md w-full mx-auto">
        <h2 className="text-customWhite text-2xl text-center mb-10">
          Forgot Your Password?
        </h2>
        <p className="text-customWhite text-center mb-6">
          Enter your email address and we will send you instructions to reset
          your password.
        </p>
        <form>
          <div className="relative mb-8">
            <input
              type="email"
              id="Email"
              name="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <Link href="/login" className="text-[#8B5CF6] hover:underline">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
