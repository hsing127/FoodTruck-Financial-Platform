"use client"; // Add this directive to make the component a Client Component

import React, { useState } from 'react';
import Link from 'next/link'; // Import Next.js Link component
import '../../styles/LoginStyles.css';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle logic to send the password reset instructions here
        console.log('Email submitted:', email);
    };

    return (
        <div className="forgotPassWord-container">
            <div className="login-box">
                <h2 className="forgot">Forgot Your Password?</h2>
                <div className="code">
                    <p className="code">
                        Enter your email address and we will send you instructions to reset your password.
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-field2">
                        <input
                            type="text"
                            id="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="email">Email address</label>
                    </div>
                    <button type="submit" className="login-btn">Submit</button>
                    <p className="signup-link">
                        <Link href="/login">Back to Login</Link> {/* Use Link here */}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
