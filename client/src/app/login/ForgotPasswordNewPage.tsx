import "@/app/globals.css";
import React, { useState } from "react";
import { useRouter } from "next/router"; // Updated import for router
import { validatePasswords } from "@/app/(components)/LoginComponents/validateForm";
import FormLayout from "@/app/(components)/LoginComponents/formLayout";
import FormInput from "@/app/(components)/LoginComponents/formInput";
import SubmitButton from "@/app/(components)/LoginComponents/submitButton";

const ForgotPasswordNewPage: React.FC = () => {
  const [formData, setFormData] = useState({ password: "", password2: "" });
  const [error, setError] = useState<string | null>(null); // Added error state
  const [loading, setLoading] = useState(false); // Added loading state
  const router = useRouter(); // Initialized router

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error state on new submit

    if (validatePasswords(formData.password, formData.password2)) {
      const newPassword = formData.password;
      if (newPassword.trim()) {
        setLoading(true); // Start loading
        try {
          const response = await fetch(
            "https://10yo5nu3x1.execute-api.ca-central-1.amazonaws.com/dev/auth/forgot-password/reset-password",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ newPassword }),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to reset password");
          }

          const data = await response.json();
          const statusCode = data.statusCode;

          if (statusCode === 200) {
            // Redirect after a short delay to allow the user to read the success message
            setTimeout(() => {
              router.push("/dashboard/home");
            }, 2000);
          } else {
            setError("Something went wrong. Please try again.");
          }
        } catch (error: any) {
          setError(
            error.message ||
              "There was an error resetting your password. Please try again."
          );
          console.error("Error:", error);
        } finally {
          setLoading(false); // End loading
        }
      } else {
        setError("Passwords must match and cannot be empty.");
      }
    } else {
      setError("Passwords do not match.");
    }
  };

  return (
    <FormLayout
      title="New Password"
      description="Enter a new password below to change your current password."
    >
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
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
        {error && (
          <div role="alert" className="mb-4 text-customRed text-sm">
            {error}
          </div>
        )}
        <SubmitButton text={loading ? "Submitting..." : "Confirm"} />
      </form>
    </FormLayout>
  );
};

export default ForgotPasswordNewPage;
