import React, { useState } from 'react';

const ForgotPasswordCodePage: React.FC = () => {
    const [verificationCode, setVerificationCode] = useState<string>(''); // State with type string

    const resendCode = () => {
        alert('A new recovery code has been sent to your email.');
    };

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
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
        <div className="LoginBody">
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
                            <input 
                                type="text" 
                                required 
                                value={verificationCode} 
                                onChange={(e) => setVerificationCode(e.target.value)} 
                            />
                            <label htmlFor="verificationCode">Verification Code</label>
                        </div>
                        <button 
                            type="submit" 
                            className="login-btn" 
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        <p className="signup-link">
                            Didn&apos;t receive a code?{' '}
                            <a onClick={resendCode} style={{ cursor: 'pointer' }}>Resend</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordCodePage;
