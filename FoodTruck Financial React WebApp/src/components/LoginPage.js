import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginStyles.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (email.trim() && password.trim()) {
            navigate('/dashboard/finance');
        } else {
            alert('Please fill in both email and password fields.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
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
                    <div className="input-field">
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

                    <div className="options">
                        <div className="remember-me">
                            <input type="checkbox" id="remember-me" name="remember-me" />
                            <label htmlFor="remember-me">Remember Me</label>
                        </div>
                        <div className="forgot-password">
                            <a href="/forgot-password">Forgot Password?</a>
                        </div>
                    </div>

                    <button type="submit" className="login-btn">Login</button>
                    <p className="signup-link">
                        Don't have an account? <a href="/signup">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
