import React from 'react';
import '../styles/LoginStyles.css';

const SignupPage = () => {
    return (
        <div className="LoginBody">
            <div className="login-container">
                <div className="login-box">
                    <h2 className="signup-h2">Sign Up</h2>
                    <form>
                        <div className="input-field2">
                            <input type="text" id="Email" name="email" required />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field2">
                            <input type="password" id="password" name="password" required />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="input-field2">
                            <input type="password" id="password2" name="password2" required />
                            <label htmlFor="password2">Re-Enter Your Password</label>
                        </div>

                        <button type="submit" className="signup-btn">Sign Up</button>
                        <p className="signup-link">
                            Already have an account? <a href="/login">Login</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
