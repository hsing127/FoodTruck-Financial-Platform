import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "@/app/globals.css";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      email.trim() &&
      password.trim() &&
      password2.trim() &&
      password === password2
    ) {
      router.push("/dashboard/finance");
    } else {
      alert(
        "Please fill in both email and password fields. Make sure Passwords Match"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-fixed bg-center bg-gray-950">
      <div className="bg-customWhite/5 backdrop-blur-lg rounded-xl shadow-lg p-10 max-w-md w-full mx-auto">
        <h2 className="text-customWhite text-2xl text-center mb-10">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-8">
            <input
              type="text"
              id="Email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-customWhite bg-transparent border-b-2 border-customWhite outline-none py-4 focus:border-[#8B5CF6] transition-all placeholder-customWhite"
            />
          </div>

          <div className="relative mb-8">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
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
              placeholder="Re-enter Password"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="mb-2 w-full text-customWhite bg-transparent border-b-2 border-customWhite outline-none py-4 focus:border-[#8B5CF6] transition-all placeholder-customWhite"
            />
          </div>
          <button
            type="submit"
            className="mb-4 w-full bg-[#8B5CF6] text-customWhite font-bold py-4 rounded-full transition-all hover:bg-[#7B49E2]"
          >
            Sign Up
          </button>
          <p className="text-customWhite text-center mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-[#8B5CF6] hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
