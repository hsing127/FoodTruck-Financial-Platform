"use client"; // Add this directive to make the component a Client Component

import React, { useState } from 'react';
import Link from 'next/link'; // Importing Link from next/link
import '../../styles/LoginStyles.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle login logic here
        console.log({ email, password, rememberMe });
    };

    return (
        <div className="LoginBody">
            <div className="login-container">
                <div className="login-box">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-field">
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
                        <div className="input-field">
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

                        <div className="options">
                            <div className="remember-me">
                                <input
                                    type="checkbox"
                                    id="remember-me"
                                    name="remember-me"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                <label htmlFor="remember-me">Remember Me</label>
                            </div>
                            <div className="forgot-password">
                                <Link href="/forgot-password">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <button type="submit" className="login-btn">Login</button>
                        <p className="signup-link">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
