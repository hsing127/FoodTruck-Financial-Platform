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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.password2) {
      alert("Please enter both email and password.");
      return;
    } else if (formData.password !== formData.password2) {
      alert("Please fill in all fields and ensure passwords match.");
      return;
    }

    const email = formData.email;
    const password = formData.password;
    try {
      const response = await fetch(
        "https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      //console.log(JSON.stringify({ email, password }));
      //console.log("Received response from server");
      //console.log(response);

      const data = await response.json();
      //console.log("response:", data);
      if (
        !response.ok ||
        data.hasOwnProperty("errorType") ||
        (data.hasOwnProperty("statusCode") && data.statusCode === 400)
      ) {
        //console.log("Signup failed, response not ok");
        const errorData = data;
        //console.log("Error data:", errorData);
        var x = errorData.body;
        if (x) {
          x = JSON.parse(x).error;
        }
        alert(
          errorData.error || errorData.errorMessage || x || "Failed to sign up"
        );
        return;
      }

      //console.log("Signup successful:", data);

      // Redirect to the dashboard on successful signup
      //console.log("Redirecting to dashboard");
      router.push("/dashboard/home");
    } catch (error) {
      //console.error("An error occurred in handleSubmit:", error);
      alert("An error occurred. Please try again.");
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
