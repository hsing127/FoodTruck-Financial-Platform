import React, { useState } from "react";
import { useRouter } from "next/router";
import "@/app/globals.css";

const ForgotPasswordNewPage: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.trim() && password2.trim() && password === password2) {
      // Navigate to the dashboard page
      router.push("/dashboard/home");
    } else {
      alert(
        "Please fill in both password fields and make sure they are the same."
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-fixed bg-center bg-gray-950">
      <div className="bg-customWhite/5 backdrop-blur-lg rounded-xl shadow-lg p-10 max-w-md w-full mx-auto">
        <h2 className="text-customWhite text-2xl text-center mb-10">
          New Password
        </h2>
        <p className="text-customWhite text-center mb-6">
          Enter a new password below to change your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-8">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="New Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-customWhite bg-transparent border-b-2 border-customWhite outline-none py-4 focus:border-[#8B5CF6] transition-all placeholder-customWhite"
            />
          </div>

          <div className="relative mb-8">
            <input
              type="password"
              id="password2"
              name="password2"
              placeholder="Confirm New Password"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="w-full text-customWhite bg-transparent border-b-2 border-customWhite outline-none py-4 focus:border-[#8B5CF6] transition-all placeholder-customWhite"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8B5CF6] text-customWhite font-bold py-4 rounded-full transition-all hover:bg-[#7B49E2]"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordNewPage;
