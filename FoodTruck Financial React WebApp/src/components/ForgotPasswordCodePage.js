import React, { useState } from 'react';

const ForgotPasswordCodePage = () => {
    const [verificationCode, setVerificationCode] = useState(''); //Written by ChatGPT

    const resendCode = () => {
        alert('A new recovery code has been sent to your email.');
    };

    const handleSubmit = (e) => { //Written by ChatGPT
        e.preventDefault(); // Prevent the default form submission

        // Check if the input field has a value
        if (verificationCode.trim()) {
            // Redirect to the new page if the verification code is not empty
            window.location.href = '/forgot-password/new';
        } else {
            // Show alert if the input is empty
            alert('Please enter the verification code before submitting.');
        }
    };

    return (
        <div className="forgotPassWord-container">
            <div className="login-box">
                <h2 className="forgot">Account Verification</h2>
                <div className="code">
                    <p className="code">
                        A verification code has been sent to your Email. Please provide the verification code to verify.
                    </p>
                </div>
                <form>
                    <div className="input-field2">
                        <input type="text" required value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)}/>
                        <label htmlFor="email">Verification Code</label>
                    </div>
                    <button type="submit" className="login-btn" onClick={handleSubmit}>Submit</button>
                    <p className="signup-link">
                        Didn't receive a code?{' '}
                        <a onClick={resendCode} style={{ cursor: 'pointer' }}>Resend</a>
                    </p>
                </form>
            </div>
        </div>
    );//<p className="signup-link"> section is written by Chat GPT
};

export default ForgotPasswordCodePage;
