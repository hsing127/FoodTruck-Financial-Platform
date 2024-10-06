import React from 'react';
import '../styles/LoginStyles.css';

const ForgotPasswordPage = () => {
    return (
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
                        <input type="text" id="Email" name="email" required />
                        <label htmlFor="email">Email address</label>
                    </div>

                    
                    <button type="submit" className="login-btn" href="/forgot-password/code">Submit</button>
                    <p className="signup-link">
                        <a href="/login">Back to Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
