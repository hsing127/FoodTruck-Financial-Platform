"use client"; // Add this directive to make the component a Client Component

import React, { useState } from 'react';
import Link from 'next/link'; // Import Next.js Link component
import '../../styles/LoginStyles.css';

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add logic for form submission, such as form validation or sending data to the backend.
        console.log({ email, password, password2 });
    };

    return (
        <div className="LoginBody">
            <div className="login-container">
                <div className="login-box">
                    <h2 className="signup-h2">Sign Up</h2>
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
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field2">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="input-field2">
                            <input
                                type="password"
                                id="password2"
                                name="password2"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                required
                            />
                            <label htmlFor="password2">Re-Enter Your Password</label>
                        </div>

                        <button type="submit" className="signup-btn">Sign Up</button>
                        <p className="signup-link">
                            Already have an account? <Link href="/login">Login</Link> {/* Use Link here */}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
