import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import '../../styles/LoginStyles.css';

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email.trim() && password.trim() && password2.trim() && password === password2) {
            router.push('/dashboard/finance');
        } else {
            alert('Please fill in both email and password fields. Make sure Passwords Match');
        }
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
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-field2">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        <div className="input-field2">
                            <input
                                type="password"
                                id="password2"
                                name="password2"
                                required
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                            <label htmlFor="password2">Re-Enter Your Password</label>
                        </div>
                        <button type="submit" className="signup-btn">Sign Up</button>
                        <p className="signup-link">
                            Already have an account? <Link href="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
