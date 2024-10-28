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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validatePasswords(formData.password, formData.password2)) {
      router.push("/dashboard/home");
    } else {
      alert("Passwords must match and cannot be empty.");
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
