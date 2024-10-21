import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "@/app/globals.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() && password.trim()) {
      router.push("/dashboard/finance");
    } else {
      alert("Please fill in both email and password fields.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-fixed bg-center bg-gray-950">
      <div className="bg-customWhite/5 backdrop-blur-lg rounded-xl shadow-lg p-10 max-w-md w-full mx-auto">
        <h2 className="text-customWhite text-2xl text-center mb-10">Login</h2>
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
            <div>
              <Link
                href="/forgotpassword"
                className="text-[#8B5CF6] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="mb-4 w-full bg-[#8B5CF6] text-customWhite font-bold py-4 rounded-full transition-all hover:bg-[#7B49E2]"
          >
            Login
          </button>

          <p className="text-customWhite text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#8B5CF6] hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
