import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import '../styles/LoginStyles.css';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (email.trim()) {
            router.push('/forgot-password/code');
        } else {
            alert('Please enter the email before submitting.');
        }
    };

    return (
        <div className="LoginBody">
            <div className="forgotPassWord-container">
                <div className="login-box">
                    <h2 className="forgot">Forgot Your Password?</h2>
                    <div className="code">
                        <p className="code">
                            Enter your email address and we will send you instructions to reset your password.
                        </p>
                    </div>
                    <form>
                        <div className="input-field2">
                            <input
                                type="text"
                                id="Email"
                                name="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="email">Email address</label>
                        </div>
                        <button
                            type="submit"
                            className="login-btn"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        <p className="signup-link">
                            <Link href="/login">Back to Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
