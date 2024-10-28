import "@/app/globals.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import FormLayout from "@/app/(components)/LoginComponents/formLayout";
import FormInput from "@/app/(components)/LoginComponents/formInput";
import SubmitButton from "@/app/(components)/LoginComponents/submitButton";
import Link from "next/link";

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email && formData.password === formData.password2) {
      router.push("/dashboard/finance");
    } else {
      alert("Please fill in all fields and ensure passwords match.");
    }
  };

  return (
    <FormLayout title="Sign Up" description="Create a new account below.">
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <FormInput
          type="password"
          name="password2"
          placeholder="Re-enter Password"
          value={formData.password2}
          onChange={handleChange}
        />
        <SubmitButton text="Sign Up" />
      </form>
      <p className="text-customWhite text-center mt-4">
        Already have an account?{" "}
        <Link href="/login/login" className="text-[#8B5CF6] hover:underline">
          Login
        </Link>
      </p>
    </FormLayout>
  );
};
export default SignupPage;
