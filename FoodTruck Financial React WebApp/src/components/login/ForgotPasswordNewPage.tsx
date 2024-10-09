import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginStyles.css';

const ForgotPasswordNewPage: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password.trim() && password2.trim() && password === password2) {
            navigate('/dashboard/finance');
        } else {
            alert('Please fill in both password fields and make sure they are the same.');
        }
    };

    return (
        <div className="LoginBody">
            <div className="login-container">
                <div className="login-box">
                    <h2 className="forgot">New Password</h2>
                    <div className="code">
                        <p className="code">
                            Enter a new password below to change your password.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input-field2">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password">New Password</label>
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
                            <label htmlFor="password2">Confirm New Password</label>
                        </div>
                        <button type="submit" className="login-btn">Confirm</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordNewPage;
