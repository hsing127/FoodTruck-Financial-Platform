import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginStyles.css';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (email.trim() && password.trim() && password2.trim() && password===password2) {
            navigate('/dashboard/finance');
        } else {
            alert('Please fill in both email and passwords fields. Make sure Passwords Match');
        }
    };
    return (
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
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
