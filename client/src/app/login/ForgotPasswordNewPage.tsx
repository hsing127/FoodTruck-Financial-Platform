import "@/app/globals.css";
import React, { useState } from "react";
import { validatePasswords } from "@/app/(components)/LoginComponents/validateForm";
import FormLayout from "@/app/(components)/LoginComponents/formLayout";
import FormInput from "@/app/(components)/LoginComponents/formInput";
import SubmitButton from "@/app/(components)/LoginComponents/submitButton";
import router from "next/router";

const ForgotPasswordNewPage: React.FC = () => {
  const [formData, setFormData] = useState({ password: "", password2: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validatePasswords(formData.password, formData.password2)) {
      const newPassword = formData.password;
      if(newPassword.trim()) {
        try {
        const response = await fetch("https://y4frxnym9g.execute-api.ca-central-1.amazonaws.com/dev/auth/forgot-password/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: JSON.stringify({ newPassword }),
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to send reset code");
        }

        const data = await response.json();
        const statusCode = data.statusCode;
        if(statusCode === 200) {
          //Redirect if the code was verified successfully
          router.push("/dashboard/home");
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
      alert("There was an error sending the password. Please try again.");
      console.error("Error:", error);
      }
      } else {
        alert("Passwords must match and cannot be empty.");
      }
    }
  };

  return (
    <FormLayout title="New Password" description="Enter a new password below to change your current password.">
      <form onSubmit={handleSubmit}>
        <FormInput
          type="password"
          name="password"
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
        />
        <FormInput
          type="password"
          name="password2"
          placeholder="Confirm New Password"
          value={formData.password2}
          onChange={handleChange}
        />
        <SubmitButton text="Confirm" />
      </form>
    </FormLayout>
  );
};

export default ForgotPasswordNewPage;
